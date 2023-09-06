<template lang="pug">
.auth
  img.auth--logo(:src="require(`../assets/img/logo.svg`)")
  .auth--block
    router-view
</template>

<style lang="scss" scoped>
@import '../styles/core/media';
.auth {
  background: #E7EEE7;
  height: auto;
  padding: 187px 0;
  &--block {
    border-radius: 20px;
    border: 1px solid #79a276;
    background: #e0e7df;
    width: 384px;
    padding: 24px;
    margin: 0 auto;
  }
  &--logo {
    display: block;
    padding: 0 0 24px;
    margin: 0 auto;
  }
}
@include media_tablet {
  .auth {
    &--block {
      margin-top: 0px;
    }
  }
}
</style>
