import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import chatModule from './chat';
import lobbyModule from './lobby';
import userStub from '@/stubs/user';
import { formatUser } from '@/services/user';

export default createStore({
  state: () => ({
    user: userStub,
    service: {
      isConnection: false,
      socket: null
    }
  }),
  mutations: {
    initService(state) {
      state.service.socket = io();
      state.service.socket.on('connection', () => {
        state.service.socket.isConnection = true;
      });
    },
    userLogin(state, inputName) {
      state.user = formatUser(inputName);
    },
    userLogout(state) {
      state.service.socket.isConnection = false;
      state.user = userStub;
    }
  },
  actions: {},
  modules: {
    chat: chatModule,
    lobby: lobbyModule
  }
});
