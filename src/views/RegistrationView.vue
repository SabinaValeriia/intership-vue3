<template lang="pug">
router-view
.account--bg
  .account--block
    form#form.account--block-form(@submit.prevent="checkInputs")
      img.account--logo-mobile(src="../assets/img/academy-logo-tablet.svg")
      h1 Sign up
      button.main.google Sign up with Google
      h2 Or continue with
      .form-group
        label(for="email") Email Address
        input#InputEmail(
          :class="getValidationClass($v, 'email')"
          placeholder="Type your email address",
          v-model="form.email"
        )
        .error-message(v-if="$v.email.required.$invalid && $v.email.$dirty") Please enter a valid email address.
      .form-group
        label.distance(for="name") Name
        input#name(
          :class="getValidationClass($v, 'username')"
          type="name",
          placeholder="Type your name",
          v-model="form.username",
        )
        .error-message(v-if="$v.username.required.$invalid && $v.username.$dirty") This field os required.
      .form-group
        label.distance(for="password") Password
        input#password(
          :class="getValidationClass($v, 'password')"
          type="password",
          placeholder="Type your password",
          v-model="form.password"
        )
        .error-message(v-if="$v.password.required.$invalid && $v.password.$dirty") Password must be at least 8 characters long.
      .form-group
        label.distance(for="role") User role
        input#role(
          :class="getValidationClass($v, 'role')"
          type="text",
          placeholder="Type your role",
          v-model="form.role"
        )
        .error-message(v-if="$v.role.required.$invalid && $v.role.$dirty") This field os required.
      //- .select-container#role
      //-   .select(@click="toggleSelect" @blur="checkRole" :class="{ error: isError }") {{ selectedText }}
      //-   .selectlist(v-show="isSelectOpen")
      //-     div(v-for="(option, index) in options" :key="index" @click="selectOption(index)") {{ option }}
      //-   .error-message(v-if="roleError") {{ roleError }}
      button#submit.main.log-in(type="submit", @click="submit") Sign up
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
import {getValidationClass, checkValidation} from "@/types/authValidation"

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
  ...defaultState
})

const rules = computed(() => {
  const rules: any = {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    username: {required, minLength: minLength(3)},
    role: {required, minLength: minLength(3)},

  };
  return rules;
});

const $v = useVuelidate(rules, form);


const submit = async () => {
  if (checkValidation($v.value)) {
    return;
  }

  try {
    const res = await userApi.registerUser(form.value);
    router.push({ name: "login" });
    console.log(res);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

onMounted(() => {
  localStorage.removeItem("isAuthenticated");
});
</script>
<style lang="scss">
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

.main {
  padding: 0;
  text-decoration: none;
}
.account {
  &--logo {
    position: absolute;
    top: 32px;
    left: 40px;
    &-mobile {
      display: none;
    }
  }
  &--block {
    &-form {
      .error {
        border: 1px solid red;
      }
      .error-message {
        color: red;
        font-size: 12px;
        margin-top: 5px;
      }
      h1 {
        font-family: var(--font-inter);
        font-style: normal;
        font-weight: 600;
        font-size: 46px;
        line-height: 56px;
        color: $dark-grey;
        text-align: center;
        margin: 0 0 30px 0;
        padding-top: 138px;
        &.login {
          padding-top: 210px;
        }
      }
      button.google::before {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../assets/img/google.svg");
        background-size: cover;
        background-repeat: no-repeat;
        content: "";
        margin-right: 8px;
        margin-top: -2px;
      }
      h2 {
        font-family: var(--font-inter);
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: $grey;
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 30px auto;
        &::after {
          content: "";
          border-top: 1px solid $dark-grey;
          width: 112px;
          display: block;
          margin-top: 8px;
          margin-left: 8px;
        }
        &::before {
          content: "";
          border-top: 1px solid $dark-grey;
          width: 112px;
          display: block;
          margin-top: 8px;
          margin-right: 8px;
        }
      }
      label {
        display: flex;
        font-family: var(--font-inter);
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: $dark-grey;
      }
      input {
        width: 338px;
        padding: 12px 0px 11px 12px;
        background: $light-white;
        border-radius: 4px;
        border: none;
        margin-top: 6px;
        outline: transparent;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        &::placeholder {
          font-family: var(--font-inter);
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: rgba(62, 69, 82, 0.5);
        }
      }
      .select-container {
        position: relative;
        margin: 0 auto;
        width: 100%;
        .select {
          font-family: var(--font-inter);
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: rgba(62, 69, 82, 0.5);
          position: relative;
          padding: 11px 0 11px 12px;
          background: $light-white;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          margin-top: 6px;
          text-align: left;
          &#text {
            padding-left: 12px;
          }
          .button {
            width: 338px;
            padding-left: 12px;
          }
          input {
            margin-top: 0;
            cursor: pointer;
          }
          .selectlist {
            width: 100%;
            div {
              padding: 11px 12px;
              border-top: 1px solid $grey;
              &:first-child {
                border: none;
              }
              &:last-child {
                padding: 11px 12px 0;
              }
            }
          }
        }
        .select::after {
          position: absolute;
          top: 16px;
          right: 16px;
          content: "";
          width: 10px;
          height: 6px;
          display: inline-block;
          cursor: pointer;
          background: url("../assets/img/arrow-bottom.svg");
        }
        .option-container {
          position: relative;
          background: $light-white;
          width: 100%;
          height: 0;
          overflow-y: auto;
          transition: 0.4s;
          .option {
            position: relative;
            padding-left: 12px;
            height: 38px;
            border-top: 1px solid rgba(0, 0, 0, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: 0.2s;
          }
        }
      }

      .select-container.active .select::after {
        transform: rotate(180deg);
      }

      .select-container.active .option-container {
        height: max-content;
      }

      label.distance {
        margin: 24px auto 6px;
      }
      p {
        font-family: var(--font-inter);
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        text-align: right;
        color: $grey;
        text-align: center;
        padding-bottom: 203px;
        &.login--distance {
          padding-bottom: 276px;
        }
      }
      button.sign-up {
        font-size: 13px;
        line-height: 20px;
        text-align: right;
        text-decoration: underline;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
      }
    }
  }
}

@media (min-width: 376px) and (max-width: 1152px) {
  .account {
    &--logo {
      display: none;
      &-mobile {
        display: block;
        margin: 0 auto;
        padding-top: 32px;
        width: 164px;
        height: 36px;
      }
    }
    &--block {
      &-form {
        h1 {
          padding-top: 69px;
          &.login {
            padding-top: 141px;
          }
        }
      }
    }
  }
}
@media (max-width: 375px) {
  .account {
    &--bg {
      width: 100%;
      min-height: 668px;
      height: 100%;
    }
    &--logo {
      display: none;
      &-mobile {
        display: block;
        top: 16px;
        left: 12px;
        position: absolute;
        height: 36px;
        width: 164px;
      }
    }
    &--block {
      width: 100%;
      padding: 0 13px;
      &-form {
        h1 {
          font-size: 32px;
          line-height: 39px;
          margin: 0 0 16px 0;
          padding-top: 76px;
          text-align: left;
          &.login {
            padding-top: 76px;
          }
        }
        button.forgot {
          font-size: 12px;
          line-height: 18px;
        }
        button.main {
          font-size: 12px;
          line-height: 15px;
          width: 351px;
          margin: 0;
          height: 38px;
        }
        h2 {
          margin: 16px auto;
          justify-content: flex-start;
        }
        label {
          font-size: 12px;
          line-height: 15px;
          input {
            width: 338px;
            padding: 8.5px 0px 8.5px 12px;
            background: $light-white;
            border-radius: 4px;
            border: none;
            margin-top: 6px;
          }
          input::placeholder {
            font-size: 12px;
            line-height: 15px;
          }
          .select-container {
            .select {
              height: 32px;
              width: 338px;
            }
            .select::after {
              top: 13px;
              right: 0px;
            }
            .option-container {
              width: 350px;
            }
          }
        }
        button.log-in {
          margin: 192px 0 16px;
          width: 350px;
          height: 38px;
        }
        p {
          color: $light-white;
          text-align: center;
          margin-left: -13px;
          padding-bottom: 24px;
          &.login--distance {
            padding-bottom: 24px;
          }
        }
        button.sign-up {
          color: $light-white;
        }
      }
    }
  }
}
</style>
