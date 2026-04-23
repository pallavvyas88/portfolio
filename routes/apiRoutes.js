const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

// --- CONFIGURE LIMITS HERE ---
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB (in bytes)
        files: 50 // Max 50 files per upload
    }
});

// Define Routes
// Note: upload.array('images', 50) also enforces the file count
router.post('/upload', upload.array('images', 50), uploadController.processBatch);
router.get('/progress/:id', uploadController.progressStream);
router.get('/download/zip/:id', uploadController.downloadZip);
router.get('/download/single/:id/:filename', uploadController.downloadSingle);

module.exports = router;