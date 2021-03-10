<template lang="pug">
div.gb-message-input
  form#chat-form
    input#msg(type="text" v-model="text")
    button(@click="submit") submit
</template>

<script>
export default {
  name: 'MessageInput',
  data: () => ({
    text: ''
  }),
  methods: {
    submit() {
      this.$store.state.service.socket.emit('chatMessage', {
        name: this.$store.state.user.name,
        text: this.text
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
