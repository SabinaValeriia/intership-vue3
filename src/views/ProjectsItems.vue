<template lang="pug">
.task-item
  .task-item--block
    img(src="../assets/img/bag.svg")
    h2 {{ $route.params.key }}
  .task-item--task(v-for="task in tasks")
    p
    h2 {{ task.name }}
    h3 {{ task.description }}
    img(src="../assets/img/task1.png")
</template>

<script setup lang="ts">

import { inject } from "vue";

let tasks = inject("tasks");
</script>

<style lang="scss">
.task-item {
  padding: 30px;
  &--block {
    display: flex;
    align-items: center;
    h2 {
      font-size: 20px;
      color: grey;
      margin-left: 10px;
    }
  }
  &--task {
    img {
      width: 800px;
    }
  }
}
</style>
