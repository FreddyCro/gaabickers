const { formatUser, userJoin, getCurrentUser, userLeave } = require('./users');

class chatService {
  constructor(io) {
    this.io = io;
    this.rooms = [];
    this.users = [];
  }

  start() {
    this.io.on('connection', socket => {
      console.log(`${socket.id} is connected`);

      socket.on('login', userName => {
        socket.emit('login', formatUser(socket.id, userName));
      });

      // disconnection
      socket.on('disconnect', userName => {
        const msg = {
          name: userName,
          text: `${userName} is disconnected.`,
          time: new Date()
        };
        socket.broadcast.emit('message', msg);
        console.log(`${socket.id} is disconnected`);
      });

      socket.on('joinRoom', ({ userName, room }) => {
        // click enter button
        const user = userJoin(socket.id, userName, room);
        socket.join(user.room);
        socket.to(user.room).emit('message', {
          name: userName,
          text: `${userName} is joined.`
        });
      });

      socket.on('leaveRoom', () => {
        // click leave button
        const user = userLeave(socket.id);

        if (user) {
          this.io.to(user.room).emit('message', {
            name: user.userName,
            text: 'leave'
          });
        }
      });

      socket.on('sendMessage', ({ name, text }) => {
        // user submit message
        const user = getCurrentUser(socket.id);

        // broacast to target room
        this.io.to(user.room).emit('message', { name, text });
      });
    });
  }
}

module.exports = chatService;
