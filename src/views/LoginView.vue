<template lang="pug">
.account--bg
  .account--block
    form.account--block-form#form(@submit.prevent="checkInputs")
      img.account--logo-mobile(src="../assets/img/academy-logo.svg")
      h1.login Log in
      button.main.google#google-signin-button Log in with Google
      h2 Or continue with
      label(for="email") Email Address
      input#InputEmail(:class="{ error: isError }" placeholder="Type your email address" v-model.trim="email" @input="checkEmail" @blur="checkEmail")
      .error-message(v-if="emailError") {{ emailError }}
      label.distance(for="password") Password 
      input#password(:class="{ error: isError }" type="password" placeholder="Type your password" v-model.trim="password" @input="checkPassword" @blur="checkPassword")
      .error-message(v-if="passwordError") {{ passwordError }}
      button.forgot Forgot your password?
      button.main.log-in(type="submit")#submit Log in
      p.login--distance New user? 
        button.sign-up Sign up
    img.account--logo(src="../assets/img/academy-logo.svg")
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const isError = ref(false);
const isEmail = (email: string): boolean => {

//eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};
const isPassword = (password: string): boolean => {
  const passwordRegex =
    password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password);

  return !passwordRegex;
};


const checkEmail = () => {
  const emailValue = email.value.trim();
  if (!emailValue) {
    emailError.value = "This field is required.";
    isError.value = true;
  } else if (!isEmail(emailValue)) {
    emailError.value = "Please enter a valid email address.";
    isError.value = true;
  } else {
    emailError.value = "";
    isError.value = false;
  }
};


const checkPassword = () => {
  const passwordValue = password.value.trim();
  if (!passwordValue) {
    passwordError.value = "Password cannot be blank";
    isError.value = true;
  } else if (passwordValue.length < 8) {
    passwordError.value = "Password must be at least 8 characters long and contain at least one uppercase letter and one digit.";
    isError.value = true;
  } else {
    passwordError.value = "";
    isError.value = false;
  }
};

const checkInputs = () => {
  checkEmail();
  checkPassword();
};


</script>
<style lang="scss">
@import "../styles/common/account.scss";
@import "../styles/common/buttons.scss";

</style>
