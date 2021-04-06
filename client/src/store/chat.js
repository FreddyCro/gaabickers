const chatModule = {
  state: {
    roomList: [],
    messages: []
  },
  mutations: {
    sendMessage(state, msg) {
      state.service.socket.emit('sendMessage', msg);
    },
    joinRoom(state, room) {
      state.service.socket.emit('joinRoom', room);
    },
    leaveRoom(state) {
      state.service.socket.emit('leaveRoom');
    }
  }
};

export default chatModule;
