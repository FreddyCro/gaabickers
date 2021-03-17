<template lang="pug">
form#input-user-name
  input#name(type="text" v-model="inputUserName")
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
    ...mapMutations(['userLogin']),
    loginSubmit(e, inputUserName) {
      e.preventDefault();
      // login
      this.userLogin(inputUserName);

      // route to chat page
      this.$router.push('chat');
    },
    loginSuccess(user) {
      console.log(user);
    }
  },
  created() {
    // login 階段 socket 還沒初始話...
    // this.$store.state.service.socket.on('login', user =>
    //   this.loginSuccess(user)
    // );
  }
};
</script>

<style lang="scss" scoped></style>
