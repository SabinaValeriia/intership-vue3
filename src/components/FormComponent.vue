<template lang="pug">
modal-component
  slot(name="close", :close="close")
  template(v-slot:content="{ close }", :close="close")
    form
      label Проєкти
        span *
      dropdown-component(:options="selectOptions", @input="input") 
      label Тип таски
        span *
      dropdown-component(:options="selectOptionsIssues", @input="inputProject")
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
import tasksApi from "@/services/api/tasksApi";
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
  {
    name: "onix-time-manager (TIME)",
    img: "project1.svg",
  },
  {
    name: "Quentn Website (QW)",
    img: "quentn.svg",
  },
  {
    name: "Hotel Monthly  (HOT)",
    img: "hot.png",
  },
];
const selectOptionsIssues = [
  {
    name: "Задача",
    img: "task.svg",
  },
  {
    name: "Баг",
    img: "task-bag.svg",
  },
  {
    name: "Епік",
    img: "epic.svg",
  },
];
let indexEdit = inject("indexEdit");
console.log(indexEdit);

const showEdit = computed(() => {
  console.log(indexEdit.value > 0);
  return indexEdit.value > 0;
});
const taskNameInput = ref("");
const taskDescriptionInput = ref("");
const taskTypeInput = ref("");
const projectInput = ref("");
const tasks = inject("tasks");

const addTask = () => {
  const newTaskCreate: Tasks = {
    data: {
      name: taskNameInput.value,
      description: taskDescriptionInput.value,
      type: taskTypeInput.value,
      project: projectInput.value,
      typeColumn: "To Do",
      index: Date.now(),
    },
  };
  emit("modal-new-task", newTaskCreate);
};

const editTask = () => {
  const dataEditTask: Tasks = {
    data: {
      name: taskNameInput.value,
      description: taskDescriptionInput.value,
      type: taskTypeInput.value,
      project: projectInput.value,
    },
  };
  emit("edit-task", dataEditTask);
  emit("close-popup-edit");
};

const handleTaskAction = () => {
  if (showEdit.value) {
    editTask();
  } else {
    addTask();
  }
};

const input = (selected: any) => {
  const regex = /\((.*?)\)/;
  const matches = selected.match(regex);
  if (matches && matches.length > 1) {
    const projectName = matches[1];
    projectInput.value = projectName;
    console.log(projectInput.value);
  }
};
const inputProject = (selected: any) => {
  taskTypeInput.value = selected;
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
