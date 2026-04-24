import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import sharp from "sharp";
import archiver from "archiver";

// Prevent Windows file locking
sharp.cache(false);

interface FileData {
  name: string;
  buffer: Buffer;
  size: number;
}

interface ProcessedResult {
  name: string;
  newName: string;
  originalRef: string;
  originalSize: string;
  finalSize: string;
  reduction: string;
  downloadUrl: string;
  error: string | null;
}

async function compressImage(buffer: Buffer, targetFormat: string, quality: number): Promise<Buffer> {
  const MAX_MP = 25_000_000; // 25 megapixels

  const image = sharp(buffer);
  const metadata = await image.metadata();
  const { width = 0, height = 0 } = metadata;

  let pipeline = image.clone();

  // Auto-resize if image exceeds 25 MP
  if (width * height > MAX_MP) {
    const scaleFactor = Math.sqrt(MAX_MP / (width * height));
    const newWidth = Math.floor(width * scaleFactor);
    const newHeight = Math.floor(height * scaleFactor);

    pipeline = pipeline.resize(newWidth, newHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Apply format optimization
  if (targetFormat === 'jpeg') {
    return await pipeline.jpeg({
      quality: quality,
      mozjpeg: true,
    }).toBuffer();
  } else if (targetFormat === 'png') {
    return await pipeline.png({
      quality: quality,
      compressionLevel: 9,
      palette: true,
    }).toBuffer();
  } else {
    // Default WebP
    return await pipeline.webp({
      quality: quality,
      alphaQuality: 100,
      smartSubsample: true,
      effort: 4,
    }).toBuffer();
  }
}

function getExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

function getNameWithoutExtension(filename: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    parts.pop();
  }
  return parts.join('.');
}

async function parseMultipartFormData(request: Request): Promise<{ files: FileData[]; format: string; quality: number; batchId: string }> {
  const formData = await request.formData();
  const files: FileData[] = [];
  let format = 'webp';
  let quality = 80;
  let batchId = 'job_' + Date.now() + '_' + Math.floor(Math.random() * 9999);

  for (const [key, value] of formData.entries()) {
    if (key === 'format' && typeof value === 'string') {
      format = value;
    } else if (key === 'quality' && typeof value === 'string') {
      quality = Math.round(Number(value) * 100) || 80;
    } else if (key === 'batchId' && typeof value === 'string') {
      batchId = value;
    } else if (key === 'images' && value instanceof File) {
      const arrayBuffer = await value.arrayBuffer();
      files.push({
        name: value.name,
        buffer: Buffer.from(arrayBuffer),
        size: value.size
      });
    }
  }

  return { files, format, quality, batchId };
}

async function createZipBuffer(files: { name: string; buffer: Buffer }[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('data', (chunk: Buffer) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', reject);

    for (const file of files) {
      archive.append(file.buffer, { name: file.name });
    }

    archive.finalize();
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const { files, format, quality, batchId } = await parseMultipartFormData(req);

    if (files.length === 0) {
      return new Response(JSON.stringify({ error: 'No files provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tmpDir = os.tmpdir();
    const batchDir = path.join(tmpDir, 'compressor', batchId);
    
    try {
      await fs.mkdir(batchDir, { recursive: true });
    } catch (e) {
      // Ignore directory exists error
    }

    const stats: ProcessedResult[] = [];
    const processedFiles: { name: string; buffer: Buffer }[] = [];

    // Process all images
    for (const file of files) {
      try {
        const startSize = file.size;
        const namePart = getNameWithoutExtension(file.name);
        const originalExt = getExtension(file.name);

        // Compress the image
        const processedBuffer = await compressImage(file.buffer, format, quality);

        // Determine extension
        const ext = format === 'jpeg' ? 'jpg' : (format === 'png' ? 'png' : 'webp');
        const outputFilename = `${namePart}.${ext}`;
        const originalFilename = `${namePart}_original.${originalExt}`;

        // Write files to temp directory
        await fs.writeFile(path.join(batchDir, outputFilename), processedBuffer);
        await fs.writeFile(path.join(batchDir, originalFilename), file.buffer);

        // Calculate stats
        const endSize = processedBuffer.length;
        const reduction = ((startSize - endSize) / startSize * 100).toFixed(2);

        processedFiles.push({ name: outputFilename, buffer: processedBuffer });

        stats.push({
          name: file.name,
          newName: outputFilename,
          originalRef: originalFilename,
          originalSize: (startSize / 1024).toFixed(2) + ' KB',
          finalSize: (endSize / 1024).toFixed(2) + ' KB',
          reduction: reduction + '%',
          downloadUrl: `/api/download/single/${batchId}/${outputFilename}`,
          error: null
        });

      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
        stats.push({
          name: file.name,
          newName: '',
          originalRef: '',
          originalSize: '',
          finalSize: '',
          reduction: '',
          downloadUrl: '',
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    // Create ZIP archive and store it
    const zipBuffer = await createZipBuffer(processedFiles);
    await fs.writeFile(path.join(batchDir, 'archive.zip'), zipBuffer);

    const endTime = Date.now();
    const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);

    return new Response(JSON.stringify({
      success: true,
      stats: stats,
      zipUrl: `/api/download/zip/${batchId}`,
      batchId: batchId,
      elapsedTime: durationSeconds
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Upload function error:", error);
    return new Response(JSON.stringify({ error: "Processing failed. " + (error instanceof Error ? error.message : '') }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
