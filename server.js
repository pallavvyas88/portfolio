const express = require('express');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const { startCleanupTask } = require('./utils/scheduler');

const app = express();
const PORT = 3000;

// Ensure Folders Exist
['uploads', 'processed', 'zips'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Middleware
app.use(express.static('public'));
app.use('/processed', express.static(path.join(__dirname, 'processed')));

// Routes
app.use('/', apiRoutes);

// Start Services
startCleanupTask();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Architecture: MVC`);
});