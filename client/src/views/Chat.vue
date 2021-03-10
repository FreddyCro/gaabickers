<template lang="pug">
div.home
  h1(v-if="state.service.socket.isConnection") hi
  div.user-info
    p {{ `name: ${state.user.name}` }}
    p {{ `id: ${state.user.id}` }}

  message-list(v-if="chat.messages.length > 0" :messages="chat.messages")
  message-input
</template>

<script>
import { mapMutations } from 'vuex';

import MessageInput from '@/components/chat/room/MessageInput';
import MessageList from '@/components/chat/room/MessageList';

export default {
  name: 'Main',
  components: {
    MessageInput,
    MessageList
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
    this.state.service.socket.on('message', msg => this.addMessage(msg));
    console.log(this.state);
  }
};
</script>
