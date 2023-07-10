<template lang="pug">
modal-component
  slot(name="close", :close="close")
  template(v-slot:content="{ close }", :close="close")
    form
      label Проєкти
        span *
      dropdown-component(:options="selectOptions")
      label Тип таски
        span *
      dropdown-component(:options="selectOptionsIssues")
      label Назва
        span *
      input(
        type="text",
        :value="showEdit ? indexEdit[indexTap] : taskNameInput",
        placeholder="Назва",
        @input="taskNameInput = $event.target.value"
      )
      label Опис таски
        span *
      input(
        type="text",
        placeholder="Опис таски",
        :value="showEdit ? indexEdit[indexTap] : taskDescriptionInput",
        @input="taskDescriptionInput = $event.target.value"
      )
    .modals--block
      button.cancel(@click="emit('close')") Відміна
      button.create(@click="handleTaskAction") {{ showEdit ? "Зберегти" : "Додати" }}
</template>

<script setup lang="ts">
import DropdownComponent from "./DropdownComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import { Tasks } from "@/types/interfaceTask";
import {
  ref,
  defineEmits,
  defineProps,
  computed,
  onMounted,
  inject,
  provide,
} from "vue";
const props = defineProps({
  close: Function,
});
const emit = defineEmits([
  "close",
  "edit-task",
  "modal-new-task",
  "close-popup-edit",
]);
const close = () => {
  console.log("close3");
  props.close();
  emit("close");
};

const selectOptions = [
  "onix-time-manager (TIME)",
  "Quentn Website (QW)",
  "Hotel Monthly  (HOT)",
];
const selectOptionsIssues = ["Задача", "Баг"];
let indexEdit = inject("indexEdit");

const showEdit = computed(() => {
  return indexEdit.value.length > 0;
});
const taskNameInput = ref("");
const taskDescriptionInput = ref("");
const addTask = () => {
  const newTaskCreate: Tasks = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
  };
  console.log(newTaskCreate);
  emit("modal-new-task", newTaskCreate);
  provide("newTaskCreate", newTaskCreate);
};

const editTask = () => {
  const editTask: Tasks = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
  };
  console.log(editTask);
  emit("edit-task", editTask);
  emit("close-popup-edit");
};

const handleTaskAction = () => {
  if (indexEdit.value.length > 0) {
    editTask();
  } else {
    addTask();
  }
};
</script>

<style lang="scss" scoped>
form {
  label {
    margin: 0 0 10px 5px;
    span {
      margin-left: 5px;
      color: red;
    }
  }
}
</style>
