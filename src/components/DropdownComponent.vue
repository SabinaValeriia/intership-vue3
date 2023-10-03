<template lang="pug">
.custom-select(:tabindex="tabindex", @blur="open = false")
  .selected(:class="{ open: open }", @click="open = !open") {{ selected }}
    span(v-if="defaultValue") Choose {{ defaultState }}
  .items(:class="{ selectHide: !open }")
    .items--block(
      v-for="(option, i) of options",
      :key="i",
      @click="selectOption(option)"
    ) {{ option }}
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from "vue";

const props = defineProps({
  options: {
    type: Array,
  },
  defaultState: {
    type: String,
    default: null,
  },
  tabindex: {
    type: Number,
    default: 0,
  },
});

const defaultValue = ref(true);

const selected = ref<string | null>(null);

const open = ref(false);

onMounted(() => {
  selected.value = props.defaultState + ":";
});

const selectOption = (option: string) => {
  selected.value = option;
  open.value = false;
  defaultValue.value = false;
  emit("input", selected.value);
};

const emit = defineEmits(["input"]);
</script>

<style scoped lang="scss">
@import "../styles/core/colors";
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  display: flex;
  align-items: center;
  .selected {
    display: flex;
    box-sizing: border-box;
    min-width: 300px;
    height: 44px;
    padding: 0px 16px;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--secondary_b_c_1, #d0dbbd);
    background: #fff;
    color: $secondary_b_t_1;
    font-family: var(--font-inter);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    z-index: 1;
    span {
      color: $hovered_default_button;
      font-family: var(--font-inter);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      margin-left: 8px;
    }
    &::after {
      position: absolute;
      content: "";
      right: 16px;
      display: flex;
      width: 16px;
      height: 16px;
      background-color: #020203;
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-image: url("../assets/img/arrow.svg");
      transform: rotate(90deg);
    }
    &.open:after {
      transform: rotate(270deg);
    }
  }
}

.custom-select .items {
  color: black;
  overflow: hidden;
  border-radius: 0 0 6px 6px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 40px;
  width: 280px;
  padding: 0 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  &--block {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}

.custom-select .items div {
  color: black;
  cursor: pointer;
  user-select: none;
}

.selectHide {
  display: none;
}
</style>
