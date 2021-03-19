<template lang="pug">
the-header
div.gb-login-box login
  login-box
</template>

<script>
import LoginBox from '@/components/login/login-box';
import TheHeader from '@/components/common/header/the-header';

export default {
  components: {
    LoginBox,
    TheHeader
  }
};
</script>

<style lang="sass" scoped></style>
