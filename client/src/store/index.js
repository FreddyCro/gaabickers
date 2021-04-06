import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import chatModule from './chat';

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
    },
    userLogout(state) {
      state.service.isConnection = false;
      state.user = null;
    },

    // chat
    ...chatModule.mutations
  }
});
