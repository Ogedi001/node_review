// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { accessCardCustomerJsonUpload } = require('./serverController');
const { url } = require('inspector');

const app = express();
const PORT = process.env.PORT || 5000;
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Define a route for file upload
app.post('/upload',accessCardCustomerJsonUpload)

// Define a route for downloading converted JSON files
app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error('File download error:', err);
            res.status(404).json({ error: 'File not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

