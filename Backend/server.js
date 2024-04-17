require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./dbConfig');
const {getRouter} = require('./routes');
// Connect to MongoDB
connectDB();

app.use(express.json());

app.use('/', getRouter);

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('', (req, res) => {
    res.send('Hi, this is my first page...');
});

// 404 notfound route
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
