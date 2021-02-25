module.exports = function chatServiceStart(io) {
  io.on('connection', socket => {
    console.log('a user is connection');
    socket.emit('message', 'you are connection');

    // handle join
    socket.on('joinRoom', userName =>
      socket.broadcast.emit('message', userName)
    );

    // handle chat message
    socket.on('chatMessage', msg => {
      socket.broadcast.emit('message', `${msg.userName}: ${msg.text}`);
      socket.emit('message', `yourself: ${msg.text}`);
    });

    // handle disconnect
    socket.on('disconnect', userName =>
      socket.broadcast.emit('message', `${userName} is disconnected.`)
    );
  });
};
