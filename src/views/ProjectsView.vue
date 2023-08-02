<template lang="pug">
.projects
    h1 Проєкти
        .projects--block(v-for="project in projects")
            .projects--block-item
                img(:src="require(`../assets/img/${project.img}`)")
                router-link(:to="{ name: 'canban', params: { key: project.key }}") {{ project.name }}
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import projectsApi from "@/services/api/projectsApi";
let projects = inject("projects");
</script>

<style lang="scss">
.projects {
  width: 100%;
  padding: 30px;
  &--block-item{
    width: 300px;
    min-height: 100px;
    background: #d4d8dd;
    border-radius: 6px;
    margin: 30px 0;
    padding: 15px;
    display: flex;
    align-items: center;
    a {
        font-size: 24px;
        text-decoration: none;
        color: black;
        text-align: center;
        margin-left: 10px;
    }
    img {
      width: 40px;
    }
  }
}
</style>
