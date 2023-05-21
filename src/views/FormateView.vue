<template>
    <div>
      <p>Formatted Date: {{ formattedDate }}</p>
      <p>Time Difference: {{ timeDifference }}</p>
      <p>Is Before: {{ isBefore }}</p>
      <p>Get Year: {{ year }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import {  getYear } from "../composables/getYear";
  import { formatDate} from "../composables/formateDate";
  import {calcTimeDiff} from "../composables/calcTimeDiff"
  import {isBeforeDate} from "../composables/isBeforeDate"
  export default defineComponent({
    setup() {
      const currentDate = new Date();
      const targetDate = new Date(2023, 5, 19);
  
      const formattedDate = computed(() => {
        const format = "YYYY-MM-DD";
        return formatDate(currentDate, format);
      });
  
      const timeDifference = computed(() => {
        const unit = "days";
        return calcTimeDiff(currentDate, targetDate, unit);
      });
  
      const isBefore = computed(() => isBeforeDate(currentDate, targetDate));
  
      const year = computed(() => getYear(currentDate));
  
      return {
        formattedDate,
        timeDifference,
        isBefore,
        year,
      };
    },
  });
  </script>
  