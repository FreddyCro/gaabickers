<template lang="pug">
div.gb-logo
  h1 GaaBickers
</template>

<script>
export default {
  name: 'GbLogo'
};
</script>

<style lang="scss" scoped>
.gb-logo {
  h1 {
    font-size: $h1;
    @include lg {
      font-size: $h1-lg;
    }
  }
}
</style>
