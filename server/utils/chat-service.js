const { formatUser, userJoin, getCurrentUser, userLeave } = require('./users');
const { formatMsg } = require('./messages');

class chatService {
  constructor(io) {
    this.io = io;
    this.rooms = [];
    this.users = [];
  }

  start() {
    this.io.on('connection', socket => {
      console.log(`${socket.id} is connected`);
      socket.emit('connection');

      // recieve front end login
      socket.on('login', userName => {
        const user = formatUser(socket.id, userName);
        this.users.push(user);
        socket.emit('login', user);
      });

      // disconnection
      socket.on('disconnect', () => {
        // TODO: slice user from users
        console.log(`${socket.id} is disconnected`);
      });

      socket.on('joinRoom', ({ userName, room }) => {
        // click enter button
        const user = userJoin(socket.id, userName, room);
        socket.join(user.room);

        socket.to(user.room).emit(
          'message',
          formatMsg({
            name: user.userName,
            text: `${user.userName} is joined.`
          })
        );
      });

      socket.on('leaveRoom', () => {
        // click leave button
        const user = userLeave(socket.id);

        if (user) {
          socket.leave(user.room);
          this.io.to(user.room).emit(
            'message',
            formatMsg({
              name: user.userName,
              text: `${user.userName} is left.`
            })
          );
        }
      });

      socket.on('sendMessage', ({ name, text }) => {
        // user submit message
        const user = getCurrentUser(socket.id);

        if (user) {
          // broacast to target room
          this.io.to(user.room).emit(
            'message',
            formatMsg({
              name,
              text
            })
          );
        }
      });

      // poll broadcast
      setInterval(() => {
        socket.broadcast.emit('getUserCount', this.users.length);
      }, 3000);
    });
  }
}

module.exports = chatService;
