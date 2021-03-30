<template>
  <gb-header />
  <router-view />
</template>

<script>
import GbHeader from '@/components/common/header/gb-header';

export default {
  name: 'App',
  components: {
    GbHeader
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: $green-lv1;
}
</style>
