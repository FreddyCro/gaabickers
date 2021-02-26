module.exports = function chatServiceStart(io) {
  io.on('connection', socket => {
    socket.emit('connection');
    // update users number

    // handle join
    socket.on('joinRoom', userName => {
      const msg = {
        name: userName,
        text: `${userName} is joined.`,
        time: new Date()
      };
      socket.broadcast.emit('message', msg);

      // update users number of room
    });

    // handle chat message
    socket.on('chatMessage', msg => {
      socket.broadcast.emit('message', `${msg.name}: ${msg.text}`);
      socket.emit('message', msg);
    });

    // handle disconnect
    socket.on('disconnect', userName => {
      const msg = {
        name: userName,
        text: `${userName} is disconnected.`,
        time: new Date()
      };
      socket.broadcast.emit('message', msg);
    });
  });
};
