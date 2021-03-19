<template lang="pug">
div.gb-message-list
  message(v-for="msg in messages" :key="msg.time" :msg="msg")
</template>

<script>
import Message from '@/components/main/chat/message';

export default {
  name: 'MessageList',
  components: {
    Message
  },
  props: {
    messages: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped></style>
