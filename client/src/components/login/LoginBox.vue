<template lang="pug">
h2 There is {{ $store.state.totalUsers }} people on server.
form#input-user-name
  label(for="name") input name
  input#name(type="text" v-model="inputUserName" minlength="1")
  button(@click="loginSubmit($event, inputUserName)") login
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'LoginBox',
  data: () => ({
    inputUserName: ''
  }),
  methods: {
    ...mapMutations(['initService', 'userLogin', 'updateTotalUsers']),
    loginSubmit(e, inputUserName) {
      e.preventDefault();

      if (inputUserName.length < 1) return;

      // login
      this.$store.state.service.socket.emit('login', inputUserName);
    },
    loginSuccess(user) {
      this.userLogin({ name: user.userName, id: user.id });
      // TODO: disabled login button
      // TODO: loading animation

      // route to chat page
      this.$router.push('chat');
    }
  },
  created() {
    this.initService();
    this.$store.state.service.socket.on('login', user =>
      this.loginSuccess(user)
    );
    this.$store.state.service.socket.on('getUserCount', count => {
      this.updateTotalUsers(count);
    });
  }
};
</script>

<style lang="scss" scoped></style>
