const { formatUser, findUser } = require('./users');
const { formatMsg } = require('./messages');
const { defaultRooms, findRoom } = require('./rooms');

class chatService {
  constructor(io) {
    this.io = io;
    this.rooms = [...defaultRooms];
    this.users = [];
  }

  login(socket, userName) {
    const user = formatUser(socket.id, userName);

    // for server
    this.users.push(user);

    // for client
    socket.emit('loginSuccess', {
      name: user.name,
      clientId: user.clientId
    });
  }

  disconnect(socket) {
    // splice total users
    const index = findUser(socket.id, this.users);
    if (index !== -1) {
      console.log(`${socket.id} is disconnected`);
      this.users.splice(index, 1)[0];
    }
  }

  joinRoom(socket, roomName) {
    const index = findUser(socket.id, this.users);
    if (index !== -1) {
      const user = this.users[index];
      user.room = roomName;

      const room = this.rooms[findRoom(user.room, this.rooms)];
      room.users.push({
        id: user.clientId,
        name: user.name
      });

      socket.join(user.room);
      socket.emit('joinRoomSuccess', user.room);
      socket.to(user.room).emit(
        'message',
        formatMsg({
          name: user.name,
          text: `${user.name} is joined.`
        })
      );
    }
  }

  leaveRoom(socket) {
    const index = findUser(socket.id, this.users);
    if (index !== -1) {
      const user = this.users[index];

      const room = this.rooms[findRoom(user.room, this.rooms)];
      const userIndexInRoom = findUser(user.id, room.users);
      room.users.splice(userIndexInRoom, 1)[0];

      socket.leave(user.room);

      this.io.to(user.room).emit(
        'message',
        formatMsg({
          name: user.name,
          text: `${user.name} is left.`
        })
      );
    }
  }

  sendMessage(socket, msg) {
    // user submit message
    const index = findUser(socket.id, this.users);

    if (index !== -1) {
      // broacast to target room
      this.io.to(this.users[index].room).emit('message', formatMsg(msg));
    }
  }

  start() {
    this.io.on('connection', socket => {
      console.log(`${socket.id} is connected`);
      socket.emit('connection');

      // poll broadcast
      setInterval(() => {
        // 這邊改成 users / rooms 整包的資料
        socket.broadcast.emit('updateInfoToClient', {
          userCount: this.users.length,
          rooms: this.rooms
        });

        socket.broadcast.emit('getUserCount', this.users.length);
      }, 3000);

      socket.on('login', userName => this.login(socket, userName));
      socket.on('disconnect', () => this.disconnect(socket));
      socket.on('joinRoom', room => this.joinRoom(socket, room));
      socket.on('leaveRoom', () => this.leaveRoom(socket));
      socket.on('sendMessage', msg => this.sendMessage(socket, msg));
    });
  }
}

module.exports = chatService;
