<template lang="pug">
div.gb-main(v-if="isLogin")

  div.nav-container
    router-link(to="/") Go to login

  div.info-container
    h1(v-if="state.service.socket.isConnection") hi
    h2 There is {{ state.totalUsers }} people on server.
    div.user-info
      p {{ `name: ${state.user.name}` }}
      p {{ `id: ${state.user.id}` }}

  //- lobby
  div.room-list-container
    gb-room-list

  hr

  //- room
  gb-message-list(v-if="chat.messages.length > 0" :messages="chat.messages")
  gb-message-input
</template>

<script>
import { socketOnReceiveMsg } from '@/services/message';

import GbMessageInput from '@/components/main/chat/gb-message-input';
import GbMessageList from '@/components/main/chat/gb-message-list';
import GbRoomList from '@/components/main/room/gb-room-list';

export default {
  name: 'Main',
  components: {
    GbMessageInput,
    GbMessageList,
    GbRoomList
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
  created() {
    // check is user login
    if (!this.isLogin) return window.location.assign(window.location.origin);
    // receive all messages
    else {
      const servcieConfig = [
        this.$store.state.service.socket,
        this.$store.state
      ];
      socketOnReceiveMsg(...servcieConfig);
    }
  }
};
</script>

<style lang="scss" scoped>
.gb-main {
  position: relative;
  @include normal-padding;
}
</style>
