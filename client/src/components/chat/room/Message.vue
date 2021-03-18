<template lang="pug">
div.gb-message
  p {{ `${msg.name || ''}: ${msg.text} at ${msg.time || ''}` }}
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: {
      type: Object
    }
  }
};
</script>
