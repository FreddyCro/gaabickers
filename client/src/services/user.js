const formatUser = ({ name, id }) => {
  return {
    name,
    id,
    isLogin: true
  };
};

const socketOnGetUserCount = (socket, state) => {
  socket.on('getUserCount', count => {
    state.totalUsers = count;
  });
};

const socketOnLoginSuccess = (socket, state, callback) => {
  socket.on('loginSuccess', ({ name, clientId }) => {
    state.user = formatUser({ name, id: clientId });
    callback();
  });
};

const socketOnJoinRoomSuccess = (socket, state) => {
  socket.on('joinRoomSuccess', room => {
    state.user.room = room;
  });
};

export {
  formatUser,
  socketOnGetUserCount,
  socketOnLoginSuccess,
  socketOnJoinRoomSuccess
};
