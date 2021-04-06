const socketOnConnction = (socket, state) => {
  socket.on('connection', () => {
    state.service.isConnection = true;
  });
};

const socketOnUpdateInfo = (socket, state) => {
  socket.on('updateInfoToClient', ({ userCount, rooms }) => {
    state.totalUsers = userCount;
    state.chat.roomList = rooms;
  });
};

export { socketOnConnction, socketOnUpdateInfo };
