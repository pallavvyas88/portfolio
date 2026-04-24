const sharp = require('sharp');

// Prevent Windows file locking
sharp.cache(false);

exports.compressImage = async (filePath, targetFormat) => {
    const MAX_MP = 25_000_000; // 25 megapixels

    const quality = 90;
    const image = sharp(filePath);

    // Get metadata (width, height)
    const metadata = await image.metadata();
    const { width, height } = metadata;

    let pipeline = image.clone();

    // ---- 1) AUTO-RESIZE IF IMAGE EXCEEDS 25 MP ----
    if (width * height > MAX_MP) {
        console.log(`⚠️ Image too large (${width}×${height}). Auto-resizing...`);

        // Calculate scale factor (to bring total pixels under 25 MP)
        const scaleFactor = Math.sqrt(MAX_MP / (width * height));

        const newWidth = Math.floor(width * scaleFactor);
        const newHeight = Math.floor(height * scaleFactor);

        pipeline = pipeline.resize(newWidth, newHeight, {
            fit: 'inside',
            withoutEnlargement: true,
        });

        console.log(`✔ Resized to ${newWidth}×${newHeight}`);
    }

    // ---- 2) APPLY FORMAT OPTIMIZATION ----
    if (targetFormat === 'jpeg') {
        pipeline.jpeg({
            quality: quality,
            mozjpeg: true,
        });
    } else if (targetFormat === 'png') {
        pipeline.png({
            quality: quality,
            compressionLevel: 9,
            palette: true,
        });
    } else {
        // Default WebP
        pipeline.webp({
            quality: quality,
            alphaQuality: 100,
            smartSubsample: true,
            effort: 4,
        });
    }

    return await pipeline.toBuffer();
};
