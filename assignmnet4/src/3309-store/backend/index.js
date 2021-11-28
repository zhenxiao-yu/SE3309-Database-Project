//get express package
const express = require('express');
//create express app instance
const app = express();
const path = require('path');

//connect server to client
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 3000; //port number
const server = `http://localhost:${port}`;
app.listen(port, ()=> console.log(`Server started. Running at: ${server}`));

//define APIs below
