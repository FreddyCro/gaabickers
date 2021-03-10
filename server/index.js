const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const apis = require('./api');
const chatService = require('./utils/chat-service');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const chat = new chatService(io);

app.use(express.static(path.join(__dirname, '../public/')));
app.use('/api', apis);

chat.start();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
