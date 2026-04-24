const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const { compressImage } = require('../services/imageProcessor');

// Store active connections for real-time updates
let clients = {};

// --- 1. Real-Time Stream Handler (SSE) ---
exports.progressStream = (req, res) => {
    const batchId = req.params.id;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    clients[batchId] = res;

    req.on('close', () => {
        delete clients[batchId];
    });
};

// Helper to send updates
const sendUpdate = (batchId, data) => {
    if (clients[batchId]) {
        clients[batchId].write(`data: ${JSON.stringify(data)}\n\n`);
    }
};

// --- 2. Main Batch Processor ---
exports.processBatch = async (req, res) => {
    const batchId = req.body.batchId || Date.now().toString();
    const processedDir = path.join(process.cwd(), 'processed', batchId);
    const zipPath = path.join(process.cwd(), 'zips', `${batchId}.zip`);
    const targetFormat = req.body.format || 'webp';

    const startTime = Date.now();

    if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });

    try {
        const totalFiles = req.files.length;
        let completedCount = 0;

        // Parallel Processing
        const processingPromises = req.files.map(async (file) => {
            try {
                const startSize = file.size;
                const namePart = path.parse(file.originalname).name;

                // Optimize (Single Pass)
                const processedBuffer = await compressImage(file.path, targetFormat);

                // Determine Extension
                let ext = targetFormat === 'jpeg' ? 'jpg' : (targetFormat === 'png' ? 'png' : 'webp');
                const outputFilename = `${namePart}.${ext}`;
                const outputPath = path.join(processedDir, outputFilename);
                
                // Save Optimized File
                await fs.promises.writeFile(outputPath, processedBuffer);

                // Save Original File (For "Compare" feature only)
                const originalExt = path.extname(file.originalname);
                const originalFilename = `${namePart}_original${originalExt}`;
                const originalPath = path.join(processedDir, originalFilename);
                
                await fs.promises.copyFile(file.path, originalPath);
                await fs.promises.unlink(file.path);

                // Stats
                const endSize = processedBuffer.length;
                const reduction = ((startSize - endSize) / startSize * 100).toFixed(2);

                // Send Update
                completedCount++;
                sendUpdate(batchId, {
                    type: 'progress',
                    current: completedCount,
                    total: totalFiles,
                    fileName: file.originalname
                });

                return {
                    name: file.originalname,
                    newName: outputFilename, // Optimized Filename
                    originalRef: originalFilename, // Original Filename (Excluded from Zip)
                    originalSize: (startSize / 1024).toFixed(2) + ' KB',
                    finalSize: (endSize / 1024).toFixed(2) + ' KB',
                    reduction: reduction + '%',
                    downloadUrl: `/download/single/${batchId}/${outputFilename}`,
                    error: null
                };

            } catch (err) {
                console.error(`Error on ${file.originalname}:`, err);
                completedCount++;
                sendUpdate(batchId, { type: 'error', fileName: file.originalname });
                return { name: file.originalname, error: err.message };
            }
        });

        const stats = await Promise.all(processingPromises);
        
        const endTime = Date.now();
        const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);

        // --- CREATE ZIP ---
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            if (clients[batchId]) {
                clients[batchId].end();
                delete clients[batchId];
            }

            res.json({
                success: true,
                stats: stats,
                zipUrl: `/download/zip/${batchId}`,
                batchId: batchId,
                elapsedTime: durationSeconds
            });
        });

        archive.on('error', (err) => { throw err; });
        archive.pipe(output);

        // --- UPDATED: ONLY ZIP OPTIMIZED FILES ---
        // Instead of zipping the whole folder (which has originals),
        // we verify against our stats list and only add the 'newName' files.
        stats.forEach(fileStat => {
            if (!fileStat.error) {
                const filePath = path.join(processedDir, fileStat.newName);
                // Add file to zip with its clean name
                archive.file(filePath, { name: fileStat.newName });
            }
        });
        // ------------------------------------------

        archive.finalize();

    } catch (error) {
        console.error("Controller Error:", error);
        if (clients[batchId]) clients[batchId].end();
        res.status(500).json({ error: "Batch processing failed." });
    }
};

exports.downloadSingle = (req, res) => {
    const filePath = path.join(process.cwd(), 'processed', req.params.id, req.params.filename);
    if (filePath.startsWith(path.join(process.cwd(), 'processed')) && fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('File not found.');
    }
};

exports.downloadZip = (req, res) => {
    const zipFile = path.join(process.cwd(), 'zips', `${req.params.id}.zip`);
    if (fs.existsSync(zipFile)) res.download(zipFile);
    else res.status(404).send('File not found.');
};