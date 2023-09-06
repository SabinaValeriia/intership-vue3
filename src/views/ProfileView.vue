<template lang="pug">
.profile
    h2 Profile photo and header image
    .profile--block
        .first 
            img(src="../assets/img/avatar.png", alt="")
        .second
            p Who can see your profile photo? 
    h2 About you
    form(@submit.prevent="checkInputs")
        label Full name
        input(type="text" v-model="form.name" placeholder="Full name" )
        .error-message(v-if="allError") {{ allError }}
        label Public name
        input(type="text" v-model="form.publicName" placeholder="Public name")
        label Job title
        input(type="text" v-model="form.job" placeholder="Your job title" )
        .error-message(v-if="allError") {{ allError }}
        label Department
        input(type="text" v-model="form.department" placeholder="Department")
        .error-message(v-if="allError") {{ allError }}
        label Email
        input(type="email" v-model="form.email" placeholder="Email")
        .error-message(v-if="emailError") {{ emailError }}
        button(type="submit" @click="submit" ) Save
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";

const form = ref({
  name: "",
  publicName: "",
  job: "",
  department: "",
  email: "",
});
const emailError = ref("");
const allError = ref("");
const isError = ref(false);
const checkInputs = () => {
    emailError.value = "";
    allError.value = "";
    isError.value = false;
  if (!isValidEmail(form.value.email)) {
    emailError.value = "Invalid email format.";
    isError.value = true;
  }
  if (!isValidAll(form.value.name)) {
    allError.value = "Invalid format.";
    isError.value = true;
  } 
  if(isValidEmail(form.value.email) && isValidAll(form.value.name)) {
    router.push("/projects");
  }
};

const isValidEmail = (email: string) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const isValidAll = (name: string): boolean => {
  const hasDigits = /\d/.test(name);
  const hasCorrectLength = name.length >= 3;
  if (!hasDigits && hasCorrectLength) {
    return true;
  }
  return false;
};
</script>

<style lang="scss">
.profile {
  width: 100%;
  padding: 80px;
  h2 {
    text-align: center;
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 522px;
    border: 1px solid #cbcfd7;
    margin: 0 auto;
    padding: 30px;
    label {
      margin-bottom: 10px;
    }
    input {
      border: 1px solid #cbcfd7;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 15px;

      &.error {
        border: 1px solid red;
      }
    }
    button {
      border: none;
      width: 300px;
      background: #81b5ff;
      padding: 15px 0;
      border-radius: 6px;
      display: block;
      margin: 15px auto 0;
    }
  }
  &--block {
    width: 584px;
    display: block;
    margin: 0 auto;
    border: 1px solid #cbcfd7;
    border-radius: 6px;
    .first {
      background: linear-gradient(
        90deg,
        rgba(82, 157, 255, 1) 35%,
        rgba(214, 230, 255, 1) 100%
      );
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      width: 584px;
      height: 114px;
      border-bottom: 1px solid #cbcfd7;

      img {
        width: 96px;
        height: 96px;
        border: 2px solid white;
        border-radius: 50px;
        margin: 38px 0 0 38px;
      }
    }
    .second {
      background: white;
      width: 584px;
      height: 114px;
      p {
        text-align: right;
        margin-right: 15px;
      }
    }
  }
}
</style>
