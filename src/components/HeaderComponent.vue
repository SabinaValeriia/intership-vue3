<template lang="pug">
.container
    .header(:style="{ background: $route.meta.background + ' !important' }")
        .header--block
          img(src="../assets/img/academy-logo.svg")
          ul
            li 
              router-link(:to="{ name: 'your-work' }") Ваша робота
            li 
              router-link(:to="{ name: 'projects' }") Проєкти
            li 
              router-link(:to="{ name: 'team' }") Команда
            button(@click="openPopup") Cтворити
        .header--block
          input.search(type="search", name="", placeholder="Search")
          router-link(:to="{ name: 'profile' }")
            img.avatar(src="../assets/img/avatar.png")
    burger-menu.mobile
form-component(v-if="showPopup || showPopupEdit" @close="closePopup" @modal-new-task="newTask" @edit-task="editTasks" )
</template>

<script lang="ts" setup>
import FormComponent from "./FormComponent.vue";
import {
  ref, defineEmits, defineProps, inject
} from "vue";
import BurgerMenu from "../components/BurgerMenu.vue";
import PopupComponent from "../components/PopupComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { Tasks } from "@/types/interfaceTask";
const showPopup = ref(false);
const emit  = defineEmits(["new-task", "edit-task", "modal-new-task"]);
const openPopup = () => {
  showPopup.value = true;
};


let showPopupEdit = inject("showPopupEdit"); 
let closeShowPopupEdit = inject("closeShowPopupEdit");
const closePopup = () => {
  showPopup.value = false;
};
const addNewTask = (newTask: Array<Tasks>) => {
  emit("new-task", newTask);
  closePopup();
};
const editTasks = (dataEditTask: Array<Tasks>) => {
  emit("edit-task", dataEditTask);
};

const handleTaskCreated = (showPopups: boolean) => {
  console.log("Task created:", showPopups);
  showPopup.value = showPopups;
};
const handleTaskEdit = (showEdit: any) => {
  showPopup.value = showEdit;
}
const newTask = (newTaskCreate:any) => {
  emit("modal-new-task", newTaskCreate);
  closePopup();
}

</script>

<style lang="scss" scoped>
@import "../styles/core/colors";
@import '../styles/core/media';
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
      a {
        text-decoration: none;
        color: black;
      }
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

@include media_tablet {
  .mobile {
    display: block;
  }
  .header {
    display: none;
  }
}
</style>
