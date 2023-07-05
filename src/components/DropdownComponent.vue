<template lang="pug">
.custom-select(:tabindex="tabindex", @blur="open = false")
  .selected(:class="{ open: open }", @click="open = !open") {{ selected }}
  .items(:class="{ selectHide: !open }")
    .items--block(
      v-for="(option, i) of options",
      :key="i",
      @click="selectOption(option)"
    ) 
      img(src="../assets/img/project1.svg")
      | {{ option }}
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from "vue";

const props = defineProps({
    options: {
        type: Array,
    },
    tabindex: {
        type: Number,
        default: 0
    }

})

const selected = ref<string | null>(null);
const open = ref(false);

onMounted(() => {
  selected.value = props.options.length > 0 ? props.options[0] : null;
  emit("input", selected.value);
});

const selectOption = (option: string) => {
  selected.value = option;
  open.value = false;
  emit("input", selected.value);
};
const emit  = defineEmits(["input"])
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  display: flex;
  align-items: center;
}

.custom-select .selected {
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  background: #f4f5f7;
  outline: none;
  height: 37px;
  width: 350px;
  display: flex;
  align-items: center;
  position: relative;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: black transparent transparent transparent;
}

.custom-select .selected.open:after {
  position: absolute;
  content: "";
  top: 12px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: transparent transparent black transparent;
}

.custom-select .items {
  color: black;
  overflow: hidden;
  border-radius: 6px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 31px;
  z-index: 1;
  width: 350px;
  padding: 0 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  &--block {
    display: flex;
    img {
      width: 20px;
      margin-right: 10px;
    }
  }
}

.custom-select .items div {
  color: black;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #ad8225;
}

.selectHide {
  display: none;
}
</style>
