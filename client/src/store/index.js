import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import chatModule from './chat';
import { formatUser } from '@/services/user';

export default createStore({
  state: () => ({
    user: null,
    totalUsers: 0,
    service: {
      isConnection: false,
      socket: null
    },
    chat: {
      ...chatModule.state
    }
  }),
  mutations: {
    // login
    initService(state) {
      state.service.socket = io();
      state.service.socket.on('connection', () => {
        state.service.isConnection = true;
      });
      state.service.socket.on('updateInfoToClient', ({ userCount, rooms }) => {
        state.totalUsers = userCount;
        state.chat.roomList = rooms;
      });
      state.service.socket.on('getUserCount', count => {
        state.totalUsers = count;
      });
    },
    userLoginSubmit(state, inputUserName) {
      state.service.socket.emit('login', inputUserName);
    },
    userLoginSuccess(state, { name, clientId }) {
      state.user = formatUser({ name, id: clientId });
    },
    userLogout(state) {
      state.service.isConnection = false;
      state.user = null;
    },

    // chat
    ...chatModule.mutations
  }
});
