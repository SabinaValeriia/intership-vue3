<template lang="pug">
.popup
          h1 {{ showEdit ? 'Редагувати таску' : 'Додати нову таску' }}
          form
            input(
              data-type="name"
              placeholder="Назва таски"
              :value="showEdit ? indexEdit[indexTap].name : taskNameInput"
              @input="taskNameInput = $event.target.value")
            input.desc(
              data-type="text"
              placeholder="Опис таскии"
              :value="showEdit ? indexEdit[indexTap].description : taskDescriptionInput"
              @input="taskDescriptionInput = $event.target.value")
          button.add(@click="handleTaskAction") {{  showEdit ? 'Зберегти' : 'Додати' }}
          button.close(@click="closePopup") 
</template>

<script lang="ts" setup>
import { Tasks } from "@/types/interfaceTask";
import { ref, defineEmits, defineProps, computed } from "vue";

const showPopups = ref(false);
const emit = defineEmits([
  "close",
  "edit-task",
  "new-task",
  "close-popup-edit",
]);

const props = defineProps({
  indexEdit: {
    type: Number,
    required: true,
  },
  indexTap: {
    type: Number,
  },
});
const showEdit = computed(() => {
  console.log(props.indexTap)
  return props.indexEdit.length > 0;
});
const closePopup = () => {
  emit("close");
};
const taskDescriptionInput = ref("");
const taskNameInput = ref("");
const addTask = () => {
  const newTask: Tasks = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
  };
  emit("new-task", newTask);
};
const editTask = () => {
  const editTask: Tasks = {
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
