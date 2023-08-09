<template lang="pug">
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      img.account--logo-mobile(src="../assets/img/academy-logo.svg")
      h1.login Log in
      button#google-signin-button.main.google Log in with Google
      h2 Or continue with
      .form-group(:class="getValidationClass($v, 'identifier')")
        label(for="email") Email Address
        input#InputEmail(
          :class="{ error: $v.identifier.$dirty && $v.identifier.$invalid || $v.identifier.$dirty && $v.identifier.required.$invalid}",
          placeholder="Type your email address",
          v-model="form.identifier",
          type="email"
        )
        span.error-message(
          v-if="$v.identifier.$dirty && $v.identifier.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.identifier.$dirty && $v.identifier.$invalid") Please enter a valid email address.
      .form-group(:class="getValidationClass($v, 'password')")
        label.distance(for="password") Password
        input#InputPassword(
          :class="{ error: $v.identifier.$dirty && $v.password.required.$invalid || $v.identifier.$dirty && $v.password.$invalid }",
          :type="passwordVisible ? 'text' : 'password'",
          placeholder="Type your password",
          v-model="form.password"
        )
        span.password-toggle(@click="passwordVisible = !passwordVisible") 
          i(:class="[passwordVisible ? 'password-show' : 'password-hide']") 
        span.error-message(
          v-if="$v.identifier.$dirty && $v.password.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.identifier.$dirty && $v.password.$invalid"
        ) Password must be at least 8 characters long.
      button.forgot Forgot your password?
      button#submit.main.log-in(type="submit") Log in
      p.login--distance New user?
        router-link.sign-up(to="/registration") Sign up
</template>

<script setup lang="ts">
import userApi from "@/services/api/userApi";
import router from "@/router";
import { ref, computed } from "vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { getValidationClass, checkValidation } from "@/types/authValidation";
import { AuthUserInterface } from "@/types/userApiInterface";

const passwordVisible = ref(false);

interface LoginData {
  identifier: string;
  password: string;
}

const defaultState: LoginData = {
  identifier: "",
  password: "",
};

const form = ref<LoginData>({
  ...defaultState,
});

const rules = computed(() => {
  const rules: any = {
    identifier: { required, email },
    password: { required, minLength: minLength(8) },
  };
  return rules;
});

const $v = useVuelidate(rules, form);

const submit = async () => {
  if (checkValidation($v.value)) {
    return;
  }
  userApi.loginUser(form.value).then((res: AuthUserInterface) => {
    if (res) {
      const authToken = res.data.jwt;
      localStorage.setItem("isAuthenticated", authToken);
      router.push({ name: "your-work" });
      console.log(res);
    }
  });
};
</script>

<style lang="scss">
@import "../styles/core/colors";
@import "../styles/common/user.scss";
</style>
