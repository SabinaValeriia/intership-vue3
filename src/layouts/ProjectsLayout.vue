<template lang="pug">
.display
  .side-bar 
    .project--block
      img(:src="require(`../assets/img/${project.img}`)")
      h2 {{ projectName }}
    h3 Планування
    ul.tabs
      h4  {{ $route.params.key }} board
      li.tab
        img(src="../assets/img/tasks.png")
        router-link(
          :to="{ name: 'projectsTasks', params: { key: $route.params.key } }"
        ) Задачі
      li.tab
        img(src="../assets/img/board.svg")
        router-link(:to="{ name: 'canban' }") Дошка KANBAN
      li.tab
        img(src="../assets/img/board.svg")
        router-link(:to="{ name: 'archive' }") Архів
    button.close(@click="hideBar")
  router-view(@tasks-updated="tasksUpdated" :tasks="tasks" @tasks-delete="deleteTask" @task-edit="editTask")
</template>

<script lang="ts" setup>
import { Tasks } from "@/types/interfaceTask";
import { ref, defineProps,defineEmits, onMounted , inject} from "vue";
import { useRoute } from "vue-router";


const tasks = inject("tasks"); 
const projects = [
  {
    name: "Onix-time-management",
    key: "TIME",
    img: "project1.svg",
  },
  {
    name: "Bracketology",
    key: "Brack",
    img: "project1.svg",
  },
];
const route = useRoute();
const key = ref(route.params.key);
const projectName = ref("");
const projectImage = ref("");
const project = projects.find((project) => project.key === key.value);
if (project) {
  projectName.value = project.name;
  projectImage.value = project.img;
}

const emit  = defineEmits(["new-task", "edit-task", "modal-new-task", "tasks-delete", "task-edit"]);
const deleteTask = (deleteItem: number) => {
  console.log(deleteItem)
  emit("tasks-delete", deleteItem);
};
const editTask = (index: number) => {
  const indexes = tasks.value;
  emit("task-edit", indexes);
};

</script>

<style lang="scss">
@import "../styles/core/colors";
body {
  margin: 0;
}
.tablet {
  display: block;
  &--block {
    display: flex;
  }
}
.mobile {
  display: none;
}
.display {
  display: flex;
}
.side-bar {
  display: flex;
  flex-direction: column;
  background: url("../assets/img/bg-tablet.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: max-content;
  min-width: 240px;
  height: 100vh;
  margin: 0;
  h3 {
    font-size: 14px;
    letter-spacing: -0.003em;
    font-weight: 600;
    color: #42526e;
    text-transform: uppercase;
    margin-left: 16px;
  }
  h4 {
    color: #0052cc;
    margin: 5px 0 0 14px;
  }
  .project--block {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 24px 8px 0 16px;
    img {
      width: 24px;
      height: 24px;
    }
    h2 {
      font-size: 14px;
      letter-spacing: -0.003em;
      font-weight: 600;
      color: #42526e;
    }
  }
  .tab-item {
    margin-left: 30px;
  }
  .tab-content {
    &.active {
      transform: translate(-210px, 10px);
    }
  }
  .close {
    height: 30px;
    margin: 240px -18px;
    width: 30px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    z-index: 1;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-right: 9px solid #8cb2dc;
      margin-right: 3px;
    }
  }
  .close.active {
    transform: translate(-230px, 0px);
    &::after {
      border-left: 9px solid #8cb2dc;
      margin-right: -3px;
      border-right: none;
    }
  }
  ul.active {
    transform: translate(-230px, 0px);
  }
  ul {
    margin: 0;
    padding: 0;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    width: 220px;
    background: #cadefc;
    margin-left: 20px;
    border-radius: 6px;
    li {
      display: flex;
      align-items: center;
      padding: 15px;
      &.active {
        border-radius: 6px;
        background: #d4d8dc;
      }

      img {
        margin-right: 10px;
        height: 24px;
      }
      a {
        font-family: "Inter", sans-serif;
        font-size: 18px;
        line-height: 20px;
        color: $black;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .close {
      position: absolute;
      right: -22px;
    }
  }
}
@media (max-width: 768px) {
  #tab3-content {
    display: block !important;
  }
  .side-bar {
    display: none;
  }
  .background {
    background: url("../assets/img/bg-tablet.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 30px;
  }
}
@media (max-width: 768px) {
  .tablet {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
