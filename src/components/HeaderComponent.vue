<template lang="pug">
.container
    .header
        .header--block
          img(src="../assets/img/academy-logo.svg")
          ul
            li Ваша робота
            li Проекти
            li Фільтри
            button Cтворити
        .header--block
          input.search(type="search", name="", placeholder="Search")
          img.avatar(src="../assets/img/avatar.png")
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
@import "../styles/core/colors";
.header {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #76b0ef;
  .search {
    margin-right: 15px;
    width: 200px;
    height: 40px;
    padding: 0 10px;
    border-radius: 6px;
    border: none;
    &::placeholder {
      font-family: "Inter", sans-serif;
      font-size: 18px;
      line-height: 20px;
    }
    &::before {
      cursor: pointer;
      background: url("../assets/img/search.png");
      width: 20px;
      height: 20px;
    }
  }
  &--block {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      list-style: none;
      margin-right: 15px;
      font-family: "Inter", sans-serif;
      font-size: 18px;
      line-height: 20px;
    }
  }
  img {
    height: 40px;
  }
  button {
    background: #ffcf03;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 10px 40px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    line-height: 20px;
  }
}

</style>
