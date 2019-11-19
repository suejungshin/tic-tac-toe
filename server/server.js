const express = require('express');
const app = express();
const port = 3000;
const Board = require('./Board.js');

app.get('/board', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(Board);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})