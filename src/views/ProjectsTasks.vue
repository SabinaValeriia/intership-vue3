<template lang="pug">
.projects-tasks
  h1 Задачі
  table.projects-tasks--block
    tr 
      th Тип
      th Ключ
      th Назва таски
      th Виконавець
      th Автор
      th Інфо
      th
    tr(
      v-for="(task, index) in tasks",
    )
      td
        .table--block
          .table--block-img(v-if="task.type === 'Баг'")
            img(
              src="https://onix-systems.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
              alt="Баг"
            ) 
            p {{ task.type }}
          .table--block-img(v-else-if="task.type === 'Задача'")
            img(src="../assets/img/task.svg") 
            p {{ task.type }}
          .table--block-img(v-else)
            img(src="../assets/img/epic.svg") 
            p {{ task.type }}
      td {{ task.project }}
      td {{ task.name }}
      td 
        .table--block
          img(src="../assets/img/people1.png")
          | Юрій Коваленко
      td 
        .table--block
          img(src="../assets/img/people2.png")
          | Юрій Коваленко
      td {{ task.description }}
      td
        button.all(@click="allOptions(index)")
          svg(
            width="24",
            height="24",
            viewBox="0 0 24 24",
            role="presentation"
          )
            g(fill="currentColor", fill-rule="evenodd")
            circle(cx="5", cy="12", r="2")
            circle(cx="12", cy="12", r="2")
            circle(cx="19", cy="12", r="2")
      .projects-tasks--options(v-if="showAllIndex === index")
        button(@click="editTask(index)") Редагувати
        button(@click="confirmDeleteTask(index)") Видалити
        router-link(
          :to="{ name: 'projectsItems', params: { key: $route.params.key, id: index } }"
        ) Більше інформації
.background(v-if="confirmDelete", @close="close")
  .popup-confirm
    p Ви дійсно бажаєте видалити данну таску?
    button(@click="deleteTask(index)") Видалити
    button.close(@click="close")
</template>

<script lang="ts" setup>
import ModalComponent from "../components/ModalComponent.vue";
import { ref, onMounted, defineEmits, defineProps, inject } from "vue";
import TasksList from "./TasksList.vue";
const emit = defineEmits(["tasks-updated", "tasks-delete", "task-edit"]);

let tasks = inject("tasks");
console.log(tasks);

const showAllIndex = ref(-1);

const allOptions = (index: number) => {
  if (showAllIndex.value === index) {
    showAllIndex.value = -1;
  } else {
    showAllIndex.value = index;
  }
};

const editTask = (index: number) => {
  const indexes = tasks;
  emit("task-edit", indexes);
};

const confirmDelete = ref(false);
const close = () => {
  confirmDelete.value = false;
};

const deleteIndex = ref(-1);

const confirmDeleteTask = (index: number) => {
  confirmDelete.value = true;
  deleteIndex.value = index;
};

const deleteTask = () => {
  if (deleteIndex.value !== -1) {
    const tasksArray = tasks.value;
    const deleteItem = tasksArray[deleteIndex.value];
    console.log(deleteItem);
    emit("tasks-delete", deleteItem);
    deleteIndex.value = -1;
  }
  close();
};
</script>

<style lang="scss">
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  &::v-deep(.popup-component) {
    position: absolute;
    border-color: initial;
    background-color: initial;
  }
  &::v-deep(.popup-confirm-back) {
    position: absolute;
    border-color: initial;
    background-color: initial;
  }
}
.popup-confirm {
  position: absolute;
  top: 300px;
  background: #fff;
  border-radius: 15px;
  padding: 40px;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 250px;
  p {
    font-family: "Inter", sans-serif;
    font-size: 35px;
    line-height: 40px;
    text-align: center;
    margin: 51px 0 0;
  }
  button {
    background: #76b0ef;
    border: none;
    display: block;
    margin: 30px auto 0;
    padding: 20px;
    width: 200px;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 28px;
    line-height: 30px;
  }
  button.close {
    background: url("../assets/img/cancel.svg");
    width: 30px;
    height: 30px;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 31px;
    cursor: pointer;
  }
}
.projects-tasks {
  width: 100%;
  padding: 30px;
  &--block {
    width: 100%;
    position: relative;
    .table--block {
      display: flex;
      align-items: center;
      &-img {
        display: flex;
        align-items: center;
      }
    }
    th {
      text-align: left;
      position: relative;
      border-bottom: 1px solid black;
    }
    td {
      img {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50px;
      }
    }
    tr {
      height: 50px;
    }
    a {
      font-size: 14px;
      text-decoration: none;
      color: black;
      text-align: left;
      padding: 10px;
    }
    .all {
      width: 32px;
      height: 32px;
      border-radius: 3px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
  }
  &--options {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 44px;
    top: 95px;
    background: white;
    border-radius: 6px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    button {
      border: none;
      border-radius: 6px;
      padding: 10px;
      background: white;
      text-align: left;
    }
  }
}
</style>
