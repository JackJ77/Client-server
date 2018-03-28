const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New connection');

  let random = Math.floor(Math.random() * 10000) + 1;
  console.log(random);

  socket.on('checkNumber', (number, callback) => {
    let matched = random === number;
    let greater = random > number;

    callback(matched);

    socket.emit('respondComparison', {
      matched,
      greater
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
