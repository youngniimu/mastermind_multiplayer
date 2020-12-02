const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));

const PORT = process.env.PORT || 8000;

const socketManager = require('./services/socketManager');

app.use(express.static('client/build'));

io.on('connection', socketManager);

server.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
