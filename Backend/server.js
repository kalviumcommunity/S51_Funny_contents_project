require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConfig');
const { getRouter } = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
connectDB();

// Use middleware to parse JSON
app.use(express.json());

// Use the 'get' router for specific routes
app.use('/', getRouter);

// Define other routes
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('', (req, res) => {
    res.send('Hi, this is my first page...');
});

// 404 route
app.use((req, res) => {
    res.status(404).send('404 Not found...');
});

const port = 3000;

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
