// import moment from 'moment';
import roomStub from '@/stubs/room';

export default {
  state: () => ({
    userList: [],
    room: roomStub,
    messages: []
  }),
  mutations: {
    userEnterRoom() {},
    userLeaveRoom() {},
    addMessage(state, msg) {
      state.messages.push({
        name: msg.name || 'anonymity',
        msg: msg.text,
        time: msg.time
      });
    }
  },
  actions: {
    // initService({ commit }) {
    //   commit('initService');
    // }
  }
};
