<template lang="pug">
header.gb-header
  div.gb-header-content
    gb-header-Logo
    gb-header-info
</template>

<script>
import GbHeaderLogo from './gb-header-logo';
import GbHeaderInfo from './gb-header-info';

export default {
  name: 'GbHeader',
  components: {
    GbHeaderLogo,
    GbHeaderInfo
  }
};
</script>

<style lang="scss" scoped>
.gb-header {
  height: $header-height-mob;
  border: dotted 1px $black;
  @include normal-padding;
  @include lg {
    height: $header-height;
  }
}

.gb-header-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include lg {
    justify-content: flex-start;
  }
}
</style>
