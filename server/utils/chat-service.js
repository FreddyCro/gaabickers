const handleUserConnection = socket => {
  socket.emit('connection');
};

const handleUserDisconnection = socket => {
  socket.on('disconnect', userName => {
    const msg = {
      name: userName,
      text: `${userName} is disconnected.`,
      time: new Date()
    };
    // socket.broadcast.emit('message', msg);
  });
};

const handleUserJoinRoom = socket => {
  socket.on('joinRoom', userName => {
    const msg = {
      name: userName,
      text: `${userName} is joined.`,
      time: new Date()
    };
    socket.broadcast.emit('message', msg);

    // update users number of room
  });
};

const handleUserLeaveRoom = socket => {};

const handleUserSendMessage = socket => {
  socket.on('chatMessage', msg => {
    socket.broadcast.emit('message', msg);
    socket.emit('message', msg);
  });
};

class chatService {
  constructor(io) {
    this.io = io;
    this.rooms = [];
    this.users = [];
  }

  addRoom(name, id) {}
  removeRoom() {}

  userConnect(name) {}
  userDisconnect() {}

  userEnterRoom() {}
  userLeaveRoom() {}

  start() {
    this.io.on('connection', socket => {
      this.userConnect(socket.id);

      handleUserConnection(socket);
      handleUserDisconnection(socket);
      handleUserJoinRoom(socket);
      handleUserLeaveRoom(socket);
      handleUserSendMessage(socket);

      // socket.on('disconnect', userName => {
      //   const msg = {
      //     name: userName,
      //     text: `${userName} is disconnected.`,
      //     time: new Date()
      //   };
      //   // socket.broadcast.emit('message', msg);
      // });
    });
  }
}

module.exports = chatService;
