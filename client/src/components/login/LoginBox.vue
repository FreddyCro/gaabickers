<template lang="pug">
form#input-user-name
  input#name(type="text" v-model="inputUserName")
  button(@click="loginSubmit(inputUserName)") login
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'LoginBox',
  data: () => ({
    inputUserName: '',
  }),
  methods: {
    ...mapMutations(['userLogin']),
    loginSubmit(inputUserName) {
      // login
      this.userLogin(inputUserName);

      // route to chat page
      this.$router.push('chat');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
