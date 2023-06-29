<template lang="pug">
.error
    img(src="../assets/img/error404.png")
    h1 {{ $route.meta.title }}
</template>

<script lang="ts" setup>
const title = "Сторінку не знайдено";
document.title = title;
</script>

<style lang="scss">
.error {
    h1 {
        font-size: 60px;
        text-align: center;
    }
  img {
    background-size: cover;
    width: 900px;
    height: 800px;
    display: block;
    margin: 0 auto;
  }
}
</style>
