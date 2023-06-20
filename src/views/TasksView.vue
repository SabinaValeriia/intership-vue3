<template lang="pug">
div
    header-component
    .tasks
        side-bar.mobile
        task-item.hide
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import SideBar from "@/components/SideBar.vue";
import TaskItem from "@/components/TaskItem.vue"
</script>

<style lang="scss" scoped>
.tasks {
  background: url("../assets/img/bg-tablet.png");
  background-position: center;
  max-width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  padding-bottom: 30px;
  .hide {
    display: none;
  }
}
@media (max-width: 375px){
  .mobile{
    display: none;
  }
  .hide {
    display: block;
  }
}
</style>
