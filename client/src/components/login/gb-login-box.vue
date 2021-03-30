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

export default {
  name: 'GbLoginBox',
  data: () => ({
    inputUserName: ''
  }),
  methods: {
    ...mapMutations(['initService', 'userLoginSubmit', 'userLoginSuccess']),
    loginSubmit(inputUserName) {
      if (inputUserName.length >= 1) this.userLoginSubmit(inputUserName);
    },
    loginSuccess(user) {
      this.userLoginSuccess(user);
      // TODO: disabled login button
      // TODO: loading animation

      // route to chat page
      this.$router.push('chat');
    }
  },
  created() {
    this.initService();
    this.$store.state.service.socket.on('loginSuccess', user =>
      this.loginSuccess(user)
    );
  }
};
</script>

<style lang="scss" scoped>
.gb-login-box {
  border: dotted 1px $black;
}
</style>
