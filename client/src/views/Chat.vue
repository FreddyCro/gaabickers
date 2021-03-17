<template lang="pug">
div.home
  router-link(to="/") Go to login
  h1(v-if="state.service.socket.isConnection") hi
  div.user-info
    p {{ `name: ${state.user.name}` }}
    p {{ `id: ${state.user.id}` }}

  room-list

  hr
  hr
  hr

  message-list(v-if="chat.messages.length > 0" :messages="chat.messages")
  message-input
</template>

<script>
import { mapMutations } from 'vuex';

import MessageInput from '@/components/chat/room/MessageInput';
import MessageList from '@/components/chat/room/MessageList';
import RoomList from '@/components/chat/lobby/RoomList';

export default {
  name: 'Main',
  components: {
    MessageInput,
    MessageList,
    RoomList
  },
  computed: {
    state() {
      return this.$store.state;
    },
    chat() {
      return this.$store.state.chat;
    }
  },
  methods: {
    ...mapMutations(['initService', 'addMessage'])
  },
  created() {
    this.initService();

    // receive all messages
    this.state.service.socket.on('message', msg => this.addMessage(msg));
  }
};
</script>
