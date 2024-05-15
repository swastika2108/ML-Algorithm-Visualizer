const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Set storage engine for file uploads

const apiKey = '';
const genAI = new GoogleGenerativeAI(apiKey);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Set storage engine for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, ''); // Destination directory for uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, 'uploadedFile.csv'); // Naming convention for uploaded files
    }
});


// Initialize multer with the storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // Limit file size to 10MB
}).single('file');


// Endpoint for file uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error uploading file');
        } else {
            console.log('File uploaded successfully');
            res.send('File uploaded successfully');
        }
    });
});

// Endpoint to execute the linear regression Python script  C:\Users\hp\Desktop\minor\\decisiontree.py
app.get('/run-linear-regression', (req, res) => {
    exec('python datasetvisualizers/linear.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing the Python script.');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Python script executed successfully.');
    });
});

// Endpoint to execute the decision tree Python script
app.get('/run-decision-tree', (req, res) => {
    exec('python datasetvisualizers/decisiontree.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing the Python script.');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Python script executed successfully.');
    });
});

// Endpoint to execute the KNN Python script
app.get('/run-knn', (req, res) => {
    exec('python datasetvisualizers/knn.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing the Python script.');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Python script executed successfully.');
    });
});

app.post('/generated-text', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.send(text);
    } catch (error) {
        res.status(500).send('Error generating text: ' + error.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
