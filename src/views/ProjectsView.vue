<template lang="pug">
.projects
    h1 Проєкти
        .projects--block(v-for="project in projects")
            .projects--block-item
                router-link(:to="{ name: 'projectsTasks', params: { key: project.key }}") {{ project.name }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

const projects = [
  {
    name: "Onix-time-management",
    key: "TIME",
  },
  {
    name: "Bracketology",
    key: "Brack",
  },
];
</script>

<style lang="scss">
.projects {
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
