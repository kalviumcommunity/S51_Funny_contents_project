require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./dbConfig');

//connect to MongoDB
connectDB()

const port = 3000;

app.get('/ping', (req, res)=>{
    res.send("pong");
});
app.get('', (req, res)=>{
    res.send("Hi this my first page...");
});

app.use((req, res)=>{
    res.status(404).send("404 Not found...")
})

mongoose.connection.once('open', ()=>{

    console.log("connected to MongoDB");

    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
      });
})
