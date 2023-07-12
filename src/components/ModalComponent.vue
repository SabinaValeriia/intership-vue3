<template lang="pug">
.background
  .modals(@click.stop)
    h1 {{ showEdit ? "Редагувати таску" : "Додати нову таску" }}
    slot(name="content")
    div(slot="item" slot-scope="{close}")
      button.close(@click="$parent.$emit('close')")
    //- .modals--block
    //-   button.cancel(@click="close") Відміна
    //-   button.create(@click="handleTaskAction") {{ showEdit ? "Зберегти" : "Додати" }}
</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, inject } from "vue";
const emit = defineEmits([
  "close",
  "edit-task",
  "modal-new-task",
  "close-popup-edit",
]);
const close = () => {
  emit("close");
};
let indexEdit = inject("indexEdit");

const showEdit = computed(() => {
  return indexEdit.value.length > 0;
});

const handleTaskAction = () => {
  if (indexEdit.value.length > 0) {
    emit("edit-task");
  } else {
    emit("modal-new-task");
  }
};
</script>

<style lang="scss">
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
.modals {
  border-radius: 6px;
  width: 800px;
  height: auto;
  background: #ffffff;
  position: relative;
  padding: 20px;
  &--block {
    display: flex;
    justify-content: end;
  }
  .close {
    background: url("../assets/img/cancel.svg");
    width: 30px;
    height: 30px;
    background-size: cover;
    border: none;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .cancel {
    background: transparent;
    border: none;
  }
  .create {
    background: #0052cc;
    width: 81px;
    height: 32px;
    color: white;
    border: none;
    border-radius: 3px;
    margin-left: 10px;
  }
  h1 {
    margin: 0 0 20px 0;
    color: #172b4d;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    input {
      border: 1px solid #dfe1e5;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 6px;
      background: #fafbfc;
      outline: none;
    }
  }
}
</style>
