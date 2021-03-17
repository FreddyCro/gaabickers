// import moment from 'moment';
const defaultRooms = [
  {
    name: 'WomenTalk'
  },
  {
    name: 'MenTalk'
  }
];

export default {
  state: () => ({
    userList: [],
    roomList: [...defaultRooms],
    messages: []
  }),
  mutations: {
    userEnterRoom() {},
    userLeaveRoom() {},
    addMessage(state, msg) {
      state.messages.push({
        name: msg.name || 'anonymity',
        text: msg.text,
        time: msg.time
      });
    }
  }
};
