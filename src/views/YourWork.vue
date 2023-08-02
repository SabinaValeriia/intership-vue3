<template lang="pug">
.container-work 
  .your-work
    h1 Ваша робота
    .block
      h3 Нещодавні проекти
      router-link(:to="{ name: 'projects' }") Всі проєкти
    .your-work--block
      .your-work--block-item(v-for="project in projects")
        img(:src="require(`../assets/img/${project.img}`)")
        .item
          router-link(:to="{ name: 'canban', params: { key: project.key } }") {{ project.name }}
          p {{ project.description }}
          h5 швидкі посилання
          h6 Мої відкриті задачі
          h6 Виконані задачі
          h6 1 дoшка
    .your-work--block(v-for="task in tasks")
        p {{ task.name }}
        p {{ task.description }}
        p {{ task.key }}
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
let tasks = inject("tasks");
let projects = inject("projects");
</script>

<style lang="scss">
.container-work {
  margin: 0 90px;
}
.your-work {
  h1 {
  }
  .block {
    display: flex;
    justify-content: space-between;
  }
  &--block {
    display: flex;
    gap: 16px;
    &-item {
      height: 168px;
      width: 240px;
      border-left: 20px solid #ffbdad;
      border-radius: 3px;
      display: flex;
      box-sizing: border-box;
      box-shadow: var(
        --ds-shadow-raised,
        0 1px 1px rgba(9, 30, 66, 0.25),
        0 0 1px rgba(9, 30, 66, 0.31)
      );
      transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
      img {
        height: 24px;
        margin: 20px 0 0 -11px;
      }
      .item {
        margin: 0 0 0 10px;
        a {
          margin: 18px 0 0;
          font-size: 14px;
          color: black;
          text-decoration: none;
          font-weight: bold;
        }
        h5 {
          font-size: 11px;
          color: #6b778c;
          text-transform: uppercase;
          margin: 15px 0;
        }
        h6 {
          font-size: 11px;
          color: #172b4d;
          margin: 10px 0;
        }
        p {
          margin: 0;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
        }
      }
    }
  }
}
</style>
