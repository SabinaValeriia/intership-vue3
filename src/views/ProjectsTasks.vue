<template lang="pug">
.projects-tasks
    h1 Задачі
    div(v-for="task in projectsTasks")
        router-link(:to="`/projects/${task.key}/issues/${task.id}`") {{ task.name }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

const projectsTasks = [
  {
    name: "Task1",
    key: "TIME",
    id: 1
  },
  {
    name: "Task2",
    key: "Brack",
    id: 2
  },
];
</script>

<style lang="scss">
.projects-tasks {
  background: url("../assets/img/bg-tablet.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: max-content;
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  &--block-item{
    width: 300px;
    min-height: 100px;
    background: #d4d8dd;
    border-radius: 6px;
    margin: 30px 0;
    padding: 15px;
    a {
        font-size: 24px;
        text-decoration: none;
        color: black;
        text-align: center;
    }
  }
}
</style>
