<template lang="pug">
router-view
.account--bg
  .account--block
    form.account--block-form#form(@submit.prevent="checkInputs")
      img.account--logo-mobile(src="../assets/img/academy-logo-tablet.svg")
      h1 Sign up
      button.main.google Sign up with Google
      h2 Or continue with
      label(for="email") Email Address
      input#InputEmail(:class="{ error: isError }" placeholder="Type your email address" v-model.trim="email" @input="checkEmail" @blur="checkEmail")
      .error-message(v-if="emailError") {{ emailError }}
      label.distance(for="name") Name
      input#name(:class="{ error: isError }" type="name" placeholder="Type your name" v-model.trim="name" @input="checkName" @blur="checkName")
      .error-message(v-if="nameError") {{ nameError }}
      label.distance(for="password") Password 
      input#password(:class="{ error: isError }" type="password" placeholder="Type your password" v-model.trim="password" @input="checkPassword" @blur="checkPassword")
      .error-message(v-if="passwordError") {{ passwordError }}
      label.distance(for="role") User role
      .select-container#role
        .select(@click="toggleSelect" @blur="checkRole" :class="{ error: isError }") {{ selectedText }}
        .selectlist(v-show="isSelectOpen")
          div(v-for="(option, index) in options" :key="index" @click="selectOption(index)") {{ option }}
        .error-message(v-if="roleError") {{ roleError }}
      button.main.log-in(type="submit")#submit Sign up
      p Already have an account? 
        router-link.sign-up(to="/login") Log in
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const options = ref(["Admin", "User"]);
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

const email = ref("");
const password = ref("");
const emailError = ref("");
const role = ref("");
const roleError = ref("");
const name = ref("");
const passwordError = ref("");
const nameError = ref("");
const isError = ref(false);
const isEmail = (email: string): boolean => {
  //eslint-disable-next-line
  /* eslint-disable */
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};
const isName = (name: string): boolean => {
  //eslint-disable-next-line
  const nameRegex = /^[A-Za-z]+$/;

  return nameRegex.test(name);
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

const checkName = () => {
  const nameValue = name.value.trim();
  if (!nameValue) {
    nameError.value = "This field is required.";
    isError.value = true;
  } else if (!isName(nameValue)) {
    nameError.value = "Name should only contain letters.";
    isError.value = true;
  } else {
    nameError.value = "";
    isError.value = false;
  }
};

const checkPassword = () => {
  const passwordValue = password.value.trim();
  if (!passwordValue) {
    passwordError.value = "This field is required.";
    isError.value = true;
  } else if (passwordValue.length < 8) {
    passwordError.value =
      "Password must be at least 8 characters long and contain at least one uppercase letter and one digit.";
    isError.value = true;
  } else {
    passwordError.value = "";
    isError.value = false;
  }
};

watch(role, () => {
  checkRole();
});

onMounted(() => {
  localStorage.removeItem("isAuthenticated");
});

const checkRole = () => {
  const roleValue = role.value.trim();
  if (roleValue === "" || roleValue === "Select") {
    roleError.value = "This field is required.";
    isError.value = true;
  } else if (roleValue === "Admin" || roleValue === "User") {
    roleError.value = "";
    isError.value = false;
  }
};

const checkInputs = () => {
  checkEmail();
  checkPassword();
  checkName();
  checkRole();
};
</script>
<style lang="scss">
@import "../styles/common/account.scss";
@import "../styles/common/buttons.scss";
@import "../styles/core/colors.scss";
.sign-up {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  text-align: right;
  color: $grey;
}
</style>
