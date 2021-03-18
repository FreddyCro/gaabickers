const chatModule = {
  state: {
    roomList: [],
    messages: []
  },
  mutations: {
    sendMessage(state, msg) {
      state.service.socket.emit('sendMessage', msg);
    },
    starReceiveMessage(state) {
      state.service.socket.on('message', msg => state.chat.messages.push(msg));
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
