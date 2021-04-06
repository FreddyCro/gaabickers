const sendMessage = (socket, userName, text) => {
  socket.emit('chatMessage', { userName, text });
};

const socketOnReceiveMsg = (socket, state) => {
  socket.on('message', msg => state.chat.messages.push(msg));
};

export { sendMessage, socketOnReceiveMsg };
