<template lang="pug">
router-view
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      img.account--logo-mobile(src="../assets/img/academy-logo-tablet.svg")
      h1 Sign up
      button.main.google Sign up with Google
      h2 Or continue with
      .form-group(:class="getValidationClass($v, 'email')")
        label(for="email") Email Address
        input#InputEmail(
          :class="{ error: $v.email.$dirty && $v.email.$invalid || $v.email.$dirty && $v.email.required.$invalid}",
          placeholder="Type your email address",
          v-model="form.email"
        )
        span.error-message(
          v-if="$v.email.$dirty && $v.email.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.email.$dirty && $v.email.$invalid") Please enter a valid email address.
      .form-group(:class="getValidationClass($v, 'username')")
        label.distance(for="name") Name
        input#name(
          :class="{ error: $v.username.$dirty && $v.username.$invalid || $v.username.$dirty && $v.username.required.$invalid}",
          type="name",
          placeholder="Type your name",
          v-model="form.username"
        )
        span.error-message(
          v-if="$v.username.$dirty && $v.username.required.$invalid"
        ) This field is required. 
      .form-group(:class="getValidationClass($v, 'password')")
        label.distance(for="password") Password
        input#password(
          :class="{ error: $v.password.$dirty && $v.password.$invalid || $v.password.$dirty && $v.password.required.$invalid}",
          type="password",
          placeholder="Type your password",
          v-model="form.password"
        )
        span.error-message(
          v-if="$v.password.$dirty && $v.password.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.password.$dirty && $v.password.$invalid") Password must be at least 8 characters long.
      .form-group(:class="getValidationClass($v, 'role')")
        label.distance(for="role") User role
        input#role(
          :class="{ error: $v.role.$dirty && $v.role.$invalid || $v.role.$dirty && $v.role.required.$invalid}",
          type="text",
          placeholder="Type your role",
          v-model="form.role"
        )
        span.error-message(
          v-if="$v.role.$dirty && $v.role.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.role.$dirty && $v.role.$invalid") Role must be at least 3 characters long.
      button#submit.main.log-in(type="submit") Sign up
      p Already have an account?
        router-link.sign-up(to="login") Log in
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import userApi from "@/services/api/userApi";
import axios from "axios";
import router from "@/router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { getValidationClass, checkValidation } from "@/types/authValidation";
import { CreateUserInterface } from "@/types/userApiInterface";

const options = ref(["Administration", "User"]);
const selectedOptionIndex = ref(-1);
const isSelectOpen = ref(false);

function toggleSelect() {
  isSelectOpen.value = !isSelectOpen.value;
}

function selectOption(index: number) {
  selectedOptionIndex.value = index;
  isSelectOpen.value = false;
}

const selectedText = computed(() => {
  return selectedOptionIndex.value >= 0
    ? options.value[selectedOptionIndex.value]
    : "Select";
});

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const defaultState: RegistrationData = {
  username: "",
  email: "",
  password: "",
  role: "",
};

const form = ref<RegistrationData>({
  ...defaultState,
});

const rules = computed(() => {
  const rules: any = {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    username: { required, minLength: minLength(3) },
    role: { required, minLength: minLength(3) },
  };
  return rules;
});

const $v = useVuelidate(rules, form);

const submit = async () => {
  if (checkValidation($v.value)) {
    return;
  }
  userApi.registerUser(form.value).then((res: CreateUserInterface) => {
    if (res) {
      router.push({ name: "login" });
      console.log(res);
    }
  });
};

onMounted(() => {
  localStorage.removeItem("isAuthenticated");
});
</script>
<style lang="scss">
@import "../styles/core/colors.scss";
@import "../styles/common/user.scss" ;
</style>
