<template lang="pug">
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      h1.login Recovery password
      p.login--distance Remembered the password?
        router-link.green(to="/login") Log in
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
      button#submit.main.log-in(type="submit")
        router-link(to="/reset") Reset the password
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

// const submit = () => {
//   if (checkValidation($v.value)) {
//     return;
//   }
//   loginUser(form.value).then((data) => {
//     if (data) {
//       const {jwt: authToken} = data;
//       localStorage.setItem("isAuthenticated", authToken);
//       router.push({ name: "your-work" });
//     }
//   });
// };
</script>

<style lang="scss">
@import "../styles/core/colors";
@import "../styles/common/user.scss";
</style>
