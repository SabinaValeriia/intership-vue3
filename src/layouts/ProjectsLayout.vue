<template lang="pug">
.display
  .side-bar(:class="{ hidden: isBarHidden }")
    .project--block
      img(:src="require(`../assets/img/${project.img}`)")
      div
        h2 {{ projectName }}
        h2 Проєкт по розробці ПО
    .pojects-board
      h3(@click="hidePlan") Планування
      ul.tabs(v-if="showPlan")
        h4 {{ $route.params.key }} board
        h5 Дошка
        li.tab(:class="{ 'active-link': $route.name === 'projectsTasks' }")
          img(src="../assets/img/tasks.png")
          router-link(
            :to="{ name: 'projectsTasks', params: { key: $route.params.key } }"
          ) Хронологія
        li.tab(:class="{ 'active-link': $route.name === 'canban' }")
          img(src="../assets/img/board.svg")
          router-link(:to="{ name: 'canban' }") Дошка KANBAN
        li.tab(:class="{ 'active-link': $route.name === 'archive' }")
          img(src="../assets/img/board.svg")
          router-link(:to="{ name: 'archive' }") Звіти
      ul.links(v-if="showPlan")
        li
          img(src="../assets/img/tasks.png")
          router-link(
            :to="{ name: 'projectsTasks', params: { key: $route.params.key } }"
          ) Задачі
        li
          img(src="../assets/img/board.svg")
          router-link(:to="{ name: 'archive' }") Архів
      button.close(@click="hideBar", :class="{ move: isBarHidden }")
  router-view(
    :class="{ hidden: isBarHidden }",
    :tasks="tasks",
    @tasks-delete="deleteTask",
    @task-edit="editTask"
  )
</template>

<script lang="ts" setup>
import { Tasks } from "@/types/interfaceTask";
import { ref, defineProps, defineEmits, onMounted, inject } from "vue";
import { useRoute } from "vue-router";

const showPlan = ref(true);
const hidePlan = () => {
  if (showPlan.value) {
    showPlan.value = false;
  } else {
    showPlan.value = true;
  }
};
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

const emit = defineEmits([
  "new-task",
  "edit-task",
  "modal-new-task",
  "tasks-delete",
  "task-edit",
]);
const deleteTask = (deleteItem: number) => {
  console.log(deleteItem);
  emit("tasks-delete", deleteItem);
};
const editTask = (index: number) => {
  const indexes = tasks.value;
  emit("task-edit", indexes);
};
const isBarHidden = ref(false);
const hideBar = () => {
  isBarHidden.value = !isBarHidden.value;
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
.hidden {
  transform: translate(-200px, 0px);
  transition: transform 0.3s ease;
}
.side-bar {
  display: flex;
  flex-direction: column;
  background: #fafbfc;
  height: max-content;
  min-width: 240px;
  height: 100vh;
  margin: 0;
  border-right: 1px solid #dad7d7;

  &.hidden {
    transition: transform 0.3s ease;
    transform: translate(-200px, 0px);
  }
  h3 {
    font-size: 14px;
    letter-spacing: -0.003em;
    font-weight: 600;
    color: #42526e;
    text-transform: uppercase;
    margin: 40px 0 5px 16px;
    &::before {
      content: "";
      border: solid black;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(45deg);
      margin: 0 10px 3px 0;
    }
  }
  h4 {
    color: #0052cc;
    margin: 5px 0 0 14px;
  }
  h5 {
    color: #0052cc;
    margin: 0 0 10px 14px;
    font-size: 12px;
  }
  .project--block {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 24px 8px 0 28px;
    img {
      width: 24px;
      height: 24px;
    }
    h2 {
      font-size: 14px;
      letter-spacing: -0.003em;
      font-weight: 600;
      color: #42526e;
      margin: 0;
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
    width: 30px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 150px;
    left: 223px;
    &.move {
      top: 78px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-right: 9px solid #8cb2dc;
      margin: 3px 3px 0 0;
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
  ul.tabs {
    margin: 0;
    padding: 5px 0 0 0;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    width: 220px;
    background: #e6effc;
    margin-left: 10px;
    border-radius: 6px;
    li {
      display: flex;
      align-items: center;
      padding: 8px 10px 8px 14px;
      border-radius: 6px;
      margin: 5px;
      &.active-link {
        background: #cadefc;
        border-left: 6px solid #0052cc;
      }
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
  ul.links {
    padding: 0;
    margin-top: 20px;
    li {
      display: flex;
      align-items: center;
      padding: 8px 10px 8px 27px;
      border-radius: 6px;
      margin: 5px;
      &.active-link {
        background: #cadefc;
        border-left: 6px solid #0052cc;
      }
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
