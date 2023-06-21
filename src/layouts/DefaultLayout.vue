<template lang="pug">
header-component.tablet
burger-menu.mobile
side-bar.tablet
router-view
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/HeaderComponent.vue"
import SideBar from "@/components/SideBar.vue"
import BurgerMenu from "@/components/BurgerMenu.vue"
import TaskItem from "@/components/TaskItem.vue"
</script>

<style lang="scss">
body {
    margin: 0;
}
.tablet {
    display: block;
}
.mobile{
    display: none;
}
@media (max-width: 768px){
    .tablet {
    display: none;
}
.mobile{
    display: block;
}
}
</style>
