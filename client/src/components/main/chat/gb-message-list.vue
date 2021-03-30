<template lang="pug">
div.gb-message-list
  gb-message(v-for="msg in messages" :key="msg.time" :msg="msg")
</template>

<script>
import GbMessage from '@/components/main/chat/gb-message';

export default {
  name: 'MessageList',
  components: {
    GbMessage
  },
  props: {
    messages: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped></style>
