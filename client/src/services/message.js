const sendMessage = (socket, userName, text) => {
  socket.emit('chatMessage', { userName, text });
};

const receiveMessage = (socket => {
  socket.on('message', msg => console.log(msg));
};

export { sendMessage, receiveMessage };
