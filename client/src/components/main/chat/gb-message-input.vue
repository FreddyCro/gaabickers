<template lang="pug">
div.gb-message-input
  form#chat-form
    input#msg(type="text" v-model="text")
    button(@click.prevent="sendMessage(msg)") submit
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'GbMessageInput',
  data: () => ({
    text: ''
  }),
  computed: {
    msg() {
      return {
        name: this.$store.state.user.name,
        text: this.text
      };
    }
  },
  methods: {
    ...mapMutations(['sendMessage'])
  }
};
</script>

<style lang="scss" scoped></style>
