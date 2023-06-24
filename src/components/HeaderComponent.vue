<template lang="pug">
.container
    .header
        .header--block
          img(src="../assets/img/academy-logo.svg")
          ul
            li Ваша робота
            li Проекти
            li Фільтри
            button(@click="openPopup") Cтворити
        .header--block
          input.search(type="search", name="", placeholder="Search")
          img.avatar(src="../assets/img/avatar.png")
    burger-menu.mobile
.background(v-if="showPopup || showPopupEdit")
    popup-component(@close="closePopup" @new-task="addNewTask" @edit-task="editTasks" :tasks="tasks" :indexEdit="indexEdit" @close-popup-edit="closeEdit")
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  defineEmits,
  defineProps,
  ref,
  onMounted,
} from "vue";
import BurgerMenu from "../components/BurgerMenu.vue";
import PopupComponent from "../components/PopupComponent.vue";
import { Tasks } from "@/types/interfaceTask";
const showPopup = ref(false);
const { emit } = getCurrentInstance();
const props = defineProps({
  indexEdit: {
    type: Number,
  },
  showPopupEdit: {
    type: Boolean,
  },
  closeShowPopupEdit: {
    type: Boolean,
  },
});
const openPopup = () => {
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};
const addNewTask = (newTask: Array<Tasks>) => {
  emit("new-task", newTask);
  closePopup();
};
const editTasks = (editTask: Array<Tasks>) => {
  emit("edit-task", editTask);
};

const handleTaskCreated = (showPopups: boolean) => {
  console.log("Task created:", showPopups);
  showPopup.value = showPopups;
};
const handleTaskEdit = (showEdit: any) => {
  showPopup.value = showEdit;
};

defineEmits(["new-task", "edit-task"]);
</script>

<style lang="scss" scoped>
@import "../styles/core/colors";

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
}
.mobile {
  display: none;
}
.header {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #76b0ef;
  .search {
    margin-right: 15px;
    width: 200px;
    height: 40px;
    padding: 0 10px;
    border-radius: 6px;
    border: none;
    &::placeholder {
      font-family: "Inter", sans-serif;
      font-size: 18px;
      line-height: 20px;
    }
    &::before {
      cursor: pointer;
      background: url("../assets/img/search.png");
      width: 20px;
      height: 20px;
    }
  }
  &--block {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      list-style: none;
      margin-right: 15px;
      font-family: "Inter", sans-serif;
      font-size: 18px;
      line-height: 20px;
    }
  }
  img {
    height: 40px;
  }
  button {
    background: #ffcf03;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 10px 40px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    line-height: 20px;
  }
}

@media (max-width: 768px) {
  .mobile {
    display: block;
  }
  .header {
    display: none;
  }
}
</style>
