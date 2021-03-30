<template lang="pug">
div.gb-login
  gb-login-box
</template>

<script>
import GbLoginBox from '@/components/login/gb-login-box';

export default {
  components: {
    GbLoginBox
  }
};
</script>

<style lang="scss" scoped>
.gb-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include normal-padding;
}
</style>
