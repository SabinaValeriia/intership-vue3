<template lang="pug">
header-component(@edit-task="editTask", @modal-new-task="newTask")
router-view(
  @tasks-delete="deleteTask",
  @task-edit="editTasks"
)
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { Tasks, Types } from "@/types/interfaceTask";
import { ref, provide, onMounted, watch, inject, defineProps } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";



const tasks = ref<Tasks[]>([]);

const deleteTask = (deleteItem: object) => {
  const taskIndex = tasks.value.findIndex((task) => task === deleteItem);
  if (taskIndex !== -1) {
    tasks.value.splice(taskIndex, 1);
  }
  provide("taskIndex", taskIndex);
};

provide("tasks", tasks);

let indexEdit = ref(-1);
const showPopupEdit = ref(false);
const closeShowPopupEdit = ref(false);
const editTask = (editTask: Tasks) => {
  if (indexEdit.value.length > 0) {
    indexEdit.value[0] = editTask;
  }
  showPopupEdit.value = false;
  closeShowPopupEdit.value = false;
};

provide("closeShowPopupEdit", closeShowPopupEdit);

const editTasks = (indexes: number) => {
  indexEdit.value = indexes;
  showPopupEdit.value = true;
};

provide("indexEdit", indexEdit);

const newTask = (newTaskCreate: any) => {
  const task = { ...newTaskCreate, typeColumn: Types.toDo };
  const projectName = task.project;

  tasks.value.push(task);
  filteredTasks();
};
let filterTask = ref([]);

const filteredTasks = () => {

  if (Array.isArray(tasks.value)) {
    const filteredToDo = tasks.value.filter(
      (task) => task.typeColumn === Types.toDo
    );

    const filteredInProgress = tasks.value.filter(
      (task) => task.typeColumn === Types.inProgress
    );

    const filteredReview = tasks.value.filter(
      (task) => task.typeColumn === Types.review
    );

    const filteredDone = tasks.value.filter(
      (task) => task.typeColumn === Types.done
    );

    filterTask.value = {
      toDo: filteredToDo,
      inProgress: filteredInProgress,
      review: filteredReview,
      done: filteredDone,
    };
  } else {
    filterTask.value = {
      toDo: [],
      inProgress: [],
      review: [],
      done: [],
    };
  }
};
watch(tasks.value, () => {
  filteredTasks();
});

provide("filterTask", filterTask);
provide("showPopupEdit", showPopupEdit);
</script>

<style lang="scss" scoped>
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
  margin: 0;
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
    background: url("../assets/img/bg-tablet.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    width: 240px;
    li {
      display: flex;
      align-items: center;
      padding: 20px;
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
