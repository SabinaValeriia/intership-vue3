<template lang="pug">
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      h1.login Authorization
      p.login--distance New user?
        router-link.green(to="/registration") Sign up
      .form-group(:class="getValidationClass($v, 'identifier')")
        label(for="email") Email
        input#InputEmail(
          placeholder="mail@gmail.com",
          v-model="form.identifier",
          type="email",
          @blur="$v.identifier.$touch()"
        )
        span.error-message(
          v-if="$v.identifier.required.$invalid"
        ) This field is required.
        span.error-message(
          v-else-if="$v.identifier.email.$invalid"
        ) Please enter a valid email address.
      .form-group(:class="getValidationClass($v, 'password')")
        .block
          label.distance(for="password") Password
          router-link.green(to="/forgot") Forgot your password?
        input#InputPassword(
          :type="passwordVisible ? 'text' : 'password'",
          placeholder="********",
          v-model="form.password",
          @blur="$v.password.$touch()"
        )
        button.password-toggle(@click="passwordVisible = !passwordVisible") 
          i(:class="[passwordVisible ? 'password-show' : 'password-hide']") 
        span.error-message(
          v-if="$v.password.required.$invalid"
        ) This field is required.
        span.error-message(
          v-else-if="$v.password.minLength.$invalid"
        ) Password must be at least 8 characters long.
      button#submit.main.log-in(type="submit") Log in
        i.loader(v-if="isLoading")
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
const isLoading = ref(false);

interface LoginData {
  identifier: string;
  password: string;
}

// const defaultState: LoginData = {
//   identifier: "",
//   password: "",
// };
const defaultState: LoginData = {
  identifier: "test@gmail.com",
  password: "12345678",
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

const submit = () => {
  isLoading.value = true;
  if (checkValidation($v.value)) {
    isLoading.value = false;
    return;
  }
  loginUser(form.value).then(({data}) => {
    isLoading.value = false;
    if (data) {
      const {jwt: authToken} = data;
      localStorage.setItem("isAuthenticated", authToken);
      router.push({ name: "your-work" });
    }
  });
};
</script>

<style lang="scss">
@import "../styles/core/colors";
@import "../styles/common/user.scss";
</style>
