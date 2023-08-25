<template lang="pug">
.projects
  h1 Проєкти
  .search--block
    input(type="search", v-model="searchText")
    img(:src="require('../assets/img/search.png')")
  table
    tr
      th 
      th Назва
      th Ключ
      th Тип
      th Керівник
      th Категорія
    tr(v-for="project in searchProjects")
      td
        img.star(:src="require('../assets/img/star.svg')")
      td 
        img(:src="require(`../assets/img/${project.img}`)")
        router-link(:to="{ name: 'canban', params: { key: project.key } }") {{ project.name }}
      td {{ project.key }}
      td {{ project.description }}
      td {{ project.head }}
      td {{ project.category }}
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed } from "vue";
import projectsApi from "@/services/api/projectsApi";
const projects = ref({});
projectsApi.showProjects().then((res) => {
  if (res) {
    projects.value = res.data.data.map((project: any) => project.attributes);
  }
});

const searchText = ref("");
const searchProjects = computed(() => {
  if (!searchText.value.trim()) {
    return projects.value;
  }

  const searchTerm = searchText.value.trim().toLowerCase();
  return projects.value.filter((project) => {
    const name = project.name.toLowerCase();
    return name.includes(searchTerm);
  });
});
</script>

<style lang="scss" scoped>
.projects {
  width: 100%;
  padding: 30px;
  .search--block {
    position: relative;
    input {
      background-color: #fafbfc;
      border: 1px solid #dfe1e6;
      border-radius: 3px;
      padding: 10px;
      width: 224px;
      outline: none;
    }
    img {
      background: url("../assets/img/search.png");
      width: 20px;
      position: absolute;
      top: 10px;
      margin-left: -30px;
    }
  }

  table {
    width: 90%;

    th {
      text-align: left;
      border-bottom: 2px solid #dfe1e6;
      padding: 10px;
    }
    td {
      padding: 10px;
      img {
        width: 20px;
        margin-right: 10px;
      }
      a {
        color: black;
        text-decoration: none;
      }
    }
    .star {
      width: 15px;
      height: 15px;
    }
  }
  &--block-item {
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
