<template lang="pug">
div.gb-message-input
  form#chat-form
    input#msg(type="text" v-model="text")
    button(@click="submit($event)") submit
</template>

<script>
export default {
  name: 'MessageInput',
  data: () => ({
    text: ''
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      this.$store.state.service.socket.emit('sendMessage', {
        name: this.$store.state.user.name,
        text: this.text
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
