import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  
  if (!slug || slug.length < 2) {
    return new Response('Not found', { status: 404 });
  }

  const batchId = slug[0];
  const filename = slug.slice(1).join('/');

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
    } else if (filename.endsWith('.gif')) {
      contentType = 'image/gif';
    }

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    };

    return new Response(buffer, { status: 200, headers });

  } catch (error) {
    console.error("Error serving file:", error);
    return new Response('File not found', { status: 404 });
  }
}
