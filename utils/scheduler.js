const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

exports.startCleanupTask = () => {
    cron.schedule('*/30 * * * *', () => {
        console.log('[Cron] Running cleanup...');
        const dirsToClean = ['uploads', 'processed', 'zips'];
        const maxAge = 15 * 60 * 1000; // 15 Minutes
        const now = Date.now();

        dirsToClean.forEach(dir => {
            const fullPath = path.join(process.cwd(), dir);
            if (!fs.existsSync(fullPath)) return;

            fs.readdir(fullPath, (err, files) => {
                if (err) return;
                files.forEach(file => {
                    const filePath = path.join(fullPath, file);
                    fs.stat(filePath, (err, stats) => {
                        if (err) return;
                        if (now - stats.mtime.getTime() > maxAge) {
                            fs.rm(filePath, { recursive: true, force: true }, () => {
                                console.log(`[Cron] Deleted: ${file}`);
                            });
                        }
                    });
                });
            });
        });
    });
};