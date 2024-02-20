const express = require('express')
const app = express()

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

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });