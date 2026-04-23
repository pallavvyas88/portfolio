import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  
  if (!slug || slug.length === 0) {
    return new Response('Not found', { status: 404 });
  }

  const type = slug[0];
  let batchId = '';
  let filename = '';
  let isZip = false;

  if (type === 'single' && slug.length >= 3) {
    batchId = slug[1];
    filename = slug.slice(2).join('/');
  } else if (type === 'zip' && slug.length >= 2) {
    batchId = slug[1];
    filename = 'archive.zip';
    isZip = true;
  } else {
    return new Response('Not found', { status: 404 });
  }

  try {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, 'compressor', batchId, filename);

    const buffer = await fs.readFile(filePath);

    let contentType = 'application/octet-stream';
    if (filename.endsWith('.webp')) {
      contentType = 'image/webp';
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (filename.endsWith('.png')) {
      contentType = 'image/png';
    } else if (filename.endsWith('.zip')) {
      contentType = 'application/zip';
    }

    const downloadName = isZip ? `compressed-images-${batchId}.zip` : filename;

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Content-Disposition': `attachment; filename="${downloadName}"`
    };

    return new Response(buffer, { status: 200, headers });

  } catch (error) {
    console.error("Error serving file:", error);
    return new Response('File not found', { status: 404 });
  }
}
