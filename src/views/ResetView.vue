<template lang="pug">
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      h1.login Create new password
      p.login--distance Passwords must be at least 6 characters
        router-link.green(to="/login") Log in
      .form-group(:class="getValidationClass($v, 'password')")
        .block
          label.distance(for="password") Password
        input#InputPassword(
          :type="passwordVisible ? 'text' : 'password'",
          placeholder="********",
          v-model="form.password",
          @blur="$v.password.$touch()"
        )
        button.password-toggle(@click="passwordVisible = !passwordVisible") 
          i(:class="[passwordVisible ? 'password-show' : 'password-hide']") 
        span.error-message(v-if="$v.password.required.$invalid") This field is required.
        span.error-message(v-else-if="$v.password.minLength.$invalid") Password must be at least 8 characters long.
      .form-group(:class="getValidationClass($v, 'password')")
        .block
          label.distance(for="password") Password
        input#InputPassword(
          :type="passwordVisible ? 'text' : 'password'",
          placeholder="********",
          v-model="form.password",
          @blur="$v.password.$touch()"
        )
        button.password-toggle(@click="passwordVisible = !passwordVisible") 
          i(:class="[passwordVisible ? 'password-show' : 'password-hide']") 
        span.error-message(v-if="$v.password.required.$invalid") This field is required.
        span.error-message(v-else-if="$v.password.minLength.$invalid") Password must be at least 8 characters long.
      button#submit.main.log-in(type="submit") 
        router-link(to="/login") Create new password
</template>

<script setup lang="ts">
import userApi, { loginUser } from "@/services/api/userApi";
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

// const submit = () => {};
</script>

<style lang="scss">
@import "../styles/core/colors";
@import "../styles/common/user.scss";
</style>
