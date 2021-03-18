<template lang="pug">
div.home(v-if="isLogin")
  router-link(to="/") Go to login
  h1(v-if="state.service.socket.isConnection") hi
  h2 There is {{ state.totalUsers }} people on server.
  div.user-info
    p {{ `name: ${state.user.name}` }}
    p {{ `id: ${state.user.id}` }}

  //- lobby
  room-list

  hr

  //- room
  message-list(v-if="chat.messages.length > 0" :messages="chat.messages")
  message-input
</template>

<script>
import { mapMutations } from 'vuex';

import MessageInput from '@/components/main/chat/MessageInput';
import MessageList from '@/components/main/chat/MessageList';
import RoomList from '@/components/main/room/RoomList';

export default {
  name: 'Main',
  components: {
    MessageInput,
    MessageList,
    RoomList
  },
  computed: {
    isLogin() {
      return this.state.service.isConnection && this.state?.user?.isLogin;
    },
    state() {
      return this.$store.state;
    },
    chat() {
      return this.$store.state.chat;
    }
  },
  methods: {
    ...mapMutations(['starReceiveMessage'])
  },
  created() {
    // check is user login
    if (!this.isLogin) return window.location.assign(window.location.origin);
    // receive all messages
    else this.starReceiveMessage();
  }
};
</script>
