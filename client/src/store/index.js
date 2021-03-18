import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import chatModule from './chat';
import lobbyModule from './lobby';
import { formatUser } from '@/services/user';

export default createStore({
  state: () => ({
    user: null,
    totalUsers: 0,
    service: {
      isConnection: false,
      socket: null
    }
  }),
  mutations: {
    initService(state) {
      state.service.socket = io();
      state.service.socket.on('connection', () => {
        state.service.isConnection = true;
      });
    },
    userLogin(state, inputName) {
      state.user = formatUser(inputName);
    },
    userLogout(state) {
      state.service.isConnection = false;
      state.user = null;
    },
    updateTotalUsers(state, count) {
      state.totalUsers = count;
    }
  },
  modules: {
    chat: chatModule,
    lobby: lobbyModule
  }
});
