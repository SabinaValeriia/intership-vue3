<template lang="pug">
.container
        .header
            .header--block
              img(src="../assets/img/academy-logo.svg")
            .header--block
              .burger(:class="{ active: isBurgerMenuOpen }" @click="toggleBurgerMenu")
                span.burger-line(:class="{ active: isBurgerMenuOpen }")
                span.burger-line(:class="{ active: isBurgerMenuOpen }")
                span.burger-line(:class="{ active: isBurgerMenuOpen }")
        .burger-menu(v-show="isBurgerMenuOpen")
            img.avatar(src="../assets/img/avatar.png")
            a Ваша робота
            a Проекти
            a Фільтри
            router-link(to="/") Задачі
            router-link(to="/") Компоненти
            router-link(to="/tasks" @click="close") Дошка KANBAN
            input.search(type="search", name="", placeholder="Search")
            button Cтворити
</template>

<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { ref } from "vue";
const isBurgerMenuOpen = ref(false);

const toggleBurgerMenu = () => {
  isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
};
const close = () => {
  isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
};
</script>

<style lang="scss" scoped>
@import "../styles/common/account.scss";
@import "../styles/common/buttons.scss";
@import "../styles/core/global.scss";
.burger-line {
  display: block;
  width: 20px;
  height: 2px;
  background-color: $black;
  margin-bottom: 4px;
  margin-left: 10px;
  &.active {
    &:nth-child(2) {
      display: none;
    }
    &:first-child {
      transform: rotate(45deg);
      position: absolute;
    }
    &:last-child {
      transform: rotate(-45deg);
    }
  }
}

.header {
  height: 80px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #76b0ef;

  &--block {
    display: flex;
    align-items: center;
  }

  img {
    height: 40px;
  }
}
@media (max-width: 768px) {
  .burger {
    display: block;
  }
  .burger-menu {
    display: block;
    display: flex;
    flex-direction: column;
    background: url("../assets/img/bg-tablet.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    padding: 20px;
    a {
      font-family: "Inter", sans-serif;
      font-size: 28px;
      line-height: 30px;
      text-align: left;
      color: $black;
      text-decoration: none;
      cursor: pointer;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &::after {
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        border-left: 9px solid $black;
      }
    }
    button {
      background: #ffcf03;
      border: none;
      border-radius: 6px;
      height: 50px;
      padding: 0;
      font-family: "Inter", sans-serif;
      font-size: 26px;
      line-height: 30px;
      width: 100%;
      display: block;
      margin: 15px auto 0;
    }
    .avatar {
      height: 100px;
      width: 100px;
      display: block;
      margin: 60px auto 20px;
    }
    .search {
      width: 100%;
      height: 50px;
      border-radius: 6px;
      border: none;
      padding: 0 10px;
      display: block;
      margin: 15px auto 0;
    }
  }
}
</style>
