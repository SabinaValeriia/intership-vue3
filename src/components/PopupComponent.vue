<template lang="pug">
.popup
          h1 {{ indexEdit.length > 0 ? 'Редагувати таску' : 'Додати нову таску' }}
          form
          input(type="name" placeholder="Назва таски" v-model="taskNameInput")
          input.desc(type="text" placeholder="Опис таски" v-model="taskDescriptionInput")
          button.add(@click="handleTaskAction") {{  indexEdit.length > 0 ? 'Зберегти' : 'Додати' }}
          button.close(@click="closePopup") 
</template>

<script setup>
import {
  ref,
  defineEmits,
  getCurrentInstance,
  defineProps,
  computed,
} from "vue";
import { Tasks } from "../types/interfaceTask.ts";
const showPopups = ref(false);
const { emit } = getCurrentInstance();

const props = defineProps({
  indexEdit: {
    type: Array,
    required: true,
  },
});

const closePopup = () => {
  emit("close");
};
const taskDescriptionInput = ref("");
const taskNameInput = ref("");
const addTask = () => {
  const newTask = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
  };
  emit("new-task", newTask);
};
const editTask = (index) => {
  const editTask = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
  };
  emit("edit-task", editTask);
  emit("close-popup-edit");
};

const handleTaskAction = () => {
  if (props.indexEdit.length > 0) {
    editTask();
  } else {
    addTask();
  }
};

defineEmits(["close", "edit-task", "new-task", "close-popup-edit"]);
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 300px;
  background: #cbd9e7;
  border-radius: 15px;
  padding: 20px;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;

  input {
    width: 97%;
    border: none;
    border-radius: 6px;
    padding: 20px 0 20px 10px;
    outline: none;
    &::placeholder {
      padding-left: 10px;
    }
    &.desc {
      margin-top: 20px;
    }
  }
  .close {
    background: url("../assets/img/cancel.svg");
    background-size: cover;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 30px;
    right: 22px;
    border: none;
    cursor: pointer;
  }
  .add {
    border: none;
    width: 300px;
    padding: 15px;
    border-radius: 6px;
    background: #ffcf03;
    display: block;
    margin: 30px auto;
  }
}
</style>
