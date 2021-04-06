<template lang="pug">
div.gb-login-box
  h2 There is {{ $store.state.totalUsers }} people on server.
  form#input-user-name
    label(for="name") input name
    input#name(type="text" v-model="inputUserName" minlength="1")
    button(@click.prevent="loginSubmit(inputUserName)") login
</template>

<script>
import { mapMutations } from 'vuex';
import { socketOnConnction, socketOnUpdateInfo } from '@/services/socket';
import { socketOnGetUserCount, socketOnLoginSuccess } from '@/services/user';

export default {
  name: 'GbLoginBox',
  data: () => ({
    inputUserName: ''
  }),
  methods: {
    ...mapMutations(['initService']),
    loginSubmit(inputUserName) {
      if (inputUserName.length < 1) return;

      this.$store.state.service.socket.emit('login', inputUserName);
    },
    loginSuccess() {
      // TODO: disabled login button
      // TODO: loading animation

      // route to chat page
      this.$router.push('chat');
    }
  },
  created() {
    this.initService();

    const servcieConfig = [this.$store.state.service.socket, this.$store.state];

    socketOnConnction(...servcieConfig);
    socketOnUpdateInfo(...servcieConfig);
    socketOnGetUserCount(...servcieConfig);
    socketOnGetUserCount(...servcieConfig);
    socketOnLoginSuccess(...servcieConfig, this.loginSuccess);
  }
};
</script>

<style lang="scss" scoped>
.gb-login-box {
  border: dotted 1px $black;
}
</style>
