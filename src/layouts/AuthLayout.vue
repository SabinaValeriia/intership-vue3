<template lang="pug">
.auth
    img.auth--logo(src="../assets/img/academy-logo.svg")
    main 
        .auth--block
          router-view
</template>


<style lang="scss" scoped>
.auth {
  background: url("../assets/img/bg-tablet.png");
  background-position: center;
  max-width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  &--block {
    background: url("../assets/img/Registration_form.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 350px;
    padding: 0 117px;
    margin: 0 auto;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    margin-top: -100px;
  }
  &--logo{
    margin: 32px 0 0 40px;
  }
}
@media(max-width: 768px) {
  .auth{
    &--block {
      margin-top: 0px;
    }
    &--logo{
    display: none;
  }
  }
}
</style>
