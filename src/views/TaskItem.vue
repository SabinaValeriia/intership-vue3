<template lang="pug">
.background
    h1 Дошка KANBAN
    .tasks-item 
        .block 
            h2 Вибрано для розробки 
            .block-item 
                h3 Task3
        .block
            h2 У роботі 
            .block-item 
                h3 Task1 
        .block
            h2 Ревью
            .block-item 
                h3 Task2
        .block
            h2 Завершено
            .block-item 
                h3 Task4
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<style lang="scss" scoped>
.background {
  background: url("../assets/img/bg-tablet.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: max-content;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  h1 {
    text-align: left;
    font-family: "Inter", sans-serif;
    font-size: 28px;
    line-height: 34px;
    margin: 0 15px 0 15px;
    padding: 15px 0;
  }
  .tasks-item {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-left: 15px;
    .block {
      padding: 15px;
      background: #d4d8dd;
      height: max-content;
      width: 220px;
      min-height: 250px;
      border-radius: 6px;
      filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
      &-item {
        height: 40px;
        background: #e9eef2;
        border-radius: 6px;
        padding: 10px;
        h3 {
          padding: 0;
          margin: 0;
        }
      }
      h2 {
        font-family: "Inter", sans-serif;
        font-size: 18px;
        line-height: 20px;
        text-align: left;
        padding: 0;
        margin: 0 0 15px 0;
      }
    }
  }
  .hide {
    display: none;
  }
}

@media (max-width: 768px) {
  .tasks-item {
    .block {
      width: 150px;
    }
  }
}

@media (max-width: 375px) {
  .hide {
    display: block;
  }
  .background {
    .tasks-item {
      .block {
        width: 100%;
        margin-right: 15px;
      }
    }
  }
}
</style>
