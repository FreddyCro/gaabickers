<template lang="pug">
div.gb-message
  p {{ `${msg.name || ''}: ${msg.text} at ${msg.time || ''}` }}
</template>

<script>
export default {
  name: 'GbMessage',
  props: {
    msg: {
      type: Object
    }
  }
};
</script>
