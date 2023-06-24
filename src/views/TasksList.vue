<template lang="pug">
.tasks
      h1 Список задач
      h2 Нових {{ tasks.length }} задач
      table.tasks--items(v-if="tasks.length")
        tr
          th() Назва
          th Опис задачі
          th
          th
        tr(v-for="(task, index) in tasks" :key="index")
          td {{ task.name }}
          td {{ task.description }}
          td.tasks--item-buttons
            button.edit(@click="editTask(index)") 
          td.tasks--item-buttons
            button.delete(@click="confirmDeleteTask(index)")
.background(v-if="confirmDelete")
    .popup-confirm-back
        .popup-confirm
            p Ви дійсно бажаєте видалити данну таску?
            button(@click="deleteTask(index)") Видалити
            button.close(@click="close")
</template>

<script lang="ts" setup>
import Tasks from "../types/interfaceTask";
import { defineProps, defineEmits, getCurrentInstance, ref } from "vue";
const props = defineProps({
  tasks: {
    type: Array as () => Tasks[],
    required: true,
  },
});

const { emit } = getCurrentInstance();

const showEdit = ref(false);

const confirmDelete = ref(false);

const close = () => {
  confirmDelete.value = false;
};

let deleteIndex = null;

const confirmDeleteTask = (index: number) => {
  confirmDelete.value = true;
  deleteIndex = index;
};

const deleteTask = () => {
  if (deleteIndex !== null) {
    let deleteItem = props.tasks[deleteIndex];
    emit("task-delete", deleteItem);
    deleteIndex = null;
  }
  close();
};

const editTask = (index: number) => {
  const indexes = props.tasks;
  emit("task-edit", indexes);
};

defineEmits(["task-edit", "task-delete"]);
</script>

<style lang="scss" scoped>
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
  background: #cbd9e7;
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
.tasks {
  background: url("../assets/img/bg-tablet.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: max-content;
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  h1 {
    font-family: "Inter", sans-serif;
    font-size: 35px;
    line-height: 40px;
  }
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 28px;
    line-height: 30px;
  }
  &--items {
    background: #d4d8dc;
    padding: 15px;
    border-radius: 15px;
  }
  &--item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    &-buttons {
      button {
        border: none;
        width: 30px;
        height: 30px;
        &.edit {
          background: url("../assets/img/edit.svg");
          background-size: contain;
          cursor: pointer;
        }
        &.delete {
          background: url("../assets/img/trash.svg");
          background-size: contain;
          cursor: pointer;
        }
      }
    }
  }
  table {
    width: 100%;
    th {
      font-family: "Inter", sans-serif;
      font-size: 28px;
      line-height: 30px;
      padding: 30px;
    }
    td {
      text-align: center;
      font-family: "Inter", sans-serif;
      font-size: 28px;
      line-height: 30px;
      padding: 30px;
      border-top: 1px solid black;
    }
    p {
      border-bottom: 1px solid black;
    }
  }
}
</style>
