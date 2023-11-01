<template lang="pug">
router-view
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="submit")
      h1 Registration
      p Already have an account?
        router-link.green(to="login") Log in
      .form-group(:class="getValidationClass($v, 'username')")
        label.distance(for="name") Username
        input#name(
          type="name",
          placeholder="Tom",
          v-model="form.username",
          @blur="$v.username.$touch()"
        )
        span.error-message(
          v-if="$v.username.required.$invalid"
        ) This field is required. 
      .form-group(:class="getValidationClass($v, 'email')")
        label(for="email") Email
        input#InputEmail(
          placeholder="mail@gmail.com",
          v-model="form.email",
          @blur="$v.email.$touch()"
        )
        span.error-message(
          v-if="$v.email.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.email.$invalid") Please enter a valid email address.
      .form-group(:class="getValidationClass($v, 'password')")
        label.distance(for="password") Password
        input#password(
          type="password",
          placeholder="*********",
          v-model="form.password",
          @blur="$v.password.$touch()"
        )
        span.error-message(
          v-if="$v.password.required.$invalid"
        ) This field is required. 
        span.error-message(
          v-else-if="$v.password.minLength.$invalid") Password must be at least 8 characters long.
      button#submit.main.log-in(type="submit") Sign up
        i.loader(v-if="isLoading")
      h2 By signing up to create an account I accept<br> Company’s 
        span Terms of Use and Privacy Policy
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import userApi, { registerUser } from "@/services/api/userApi";
import axios from "axios";
import router from "@/router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { getValidationClass, checkValidation } from "@/types/authValidation";
import { CreateUserInterface } from "@/types/userApiInterface";
const isLoading = ref(false);
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
  role: "authorization",
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

const submit = () => {
  isLoading.value = true;
  if (checkValidation($v.value)) {
    isLoading.value = false;
    return;
  }
  registerUser(form.value).then((res) => {
    if (res) {
      router.push({ name: "login" });
    }
  });
};
</script>
<style lang="scss">
@import "../styles/core/colors.scss";
@import "../styles/common/user.scss" ;
</style>
