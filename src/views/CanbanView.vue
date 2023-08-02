<template lang="pug">
.canban
  h2 Дошка Kanban
  .columns
    .column
      h3 To Do
      draggable.list-group(
        v-model="filterTask.toDo",
        group="tasksGroup",
        :disabled="!enabled",
        item-key="item",
        ghost-class="ghost",
        @start="dragging = true",
        @end="dragging = false"
      )
        template(#item="{ element }")
          .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
            .task-block
              .task-desc
                img(
                  :src="require(`../assets/img/${getImageSrc(element.type)}`)"
                )
                svg(
                  width="24",
                  height="24",
                  viewBox="0 0 24 24",
                  role="presentation"
                )
                  path(
                    d="M16 12c0-1.9-1.3-3.4-3-3.9V4c0-.6-.4-1-1-1s-1 .4-1 1v4.1c-1.7.4-3 2-3 3.9s1.3 3.4 3 3.9V20c0 .6.4 1 1 1s1-.4 1-1v-4.1c1.7-.5 3-2 3-3.9zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
                    fill="currentColor",
                    fill-rule="evenodd"
                  )
              .task-desc 
                h6 {{ element.project }}
                img(src="../assets/img/avatar.png")

    .column
      h3 In Progress
      draggable.list-group(
        v-model="filterTask.inProgress",
        group="tasksGroup",
        :disabled="!enabled",
        item-key="name",
        ghost-class="ghost",
        @start="dragging = true",
        @end="dragging = false"
      )
        template(#item="{ element }")
          .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
            .task-block
              .task-desc
                img(
                  :src="require(`../assets/img/${getImageSrc(element.type)}`)"
                )
                svg(
                  width="24",
                  height="24",
                  viewBox="0 0 24 24",
                  role="presentation"
                )
                  path(
                    d="M16 12c0-1.9-1.3-3.4-3-3.9V4c0-.6-.4-1-1-1s-1 .4-1 1v4.1c-1.7.4-3 2-3 3.9s1.3 3.4 3 3.9V20c0 .6.4 1 1 1s1-.4 1-1v-4.1c1.7-.5 3-2 3-3.9zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
                    fill="currentColor",
                    fill-rule="evenodd"
                  )
              .task-desc 
                h6 {{ element.project }}
                img(src="../assets/img/avatar.png")
    .column
      h3 Review
      draggable.list-group(
        v-model="filterTask.review",
        group="tasksGroup",
        :disabled="!enabled",
        item-key="name",
        ghost-class="ghost",
        @start="dragging = true",
        @end="dragging = false"
      )
        template(#item="{ element }")
          .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
            .task-block
              .task-desc
                img(
                  :src="require(`../assets/img/${getImageSrc(element.type)}`)"
                )
                svg(
                  width="24",
                  height="24",
                  viewBox="0 0 24 24",
                  role="presentation"
                )
                  path(
                    d="M16 12c0-1.9-1.3-3.4-3-3.9V4c0-.6-.4-1-1-1s-1 .4-1 1v4.1c-1.7.4-3 2-3 3.9s1.3 3.4 3 3.9V20c0 .6.4 1 1 1s1-.4 1-1v-4.1c1.7-.5 3-2 3-3.9zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
                    fill="currentColor",
                    fill-rule="evenodd"
                  )
              .task-desc 
                h6 {{ element.project }}
                img(src="../assets/img/avatar.png")
    .column
      h3 Done
      draggable.list-group(
        v-model="filterTask.done",
        group="tasksGroup",
        :disabled="!enabled",
        item-key="name",
        ghost-class="ghost",
        @start="dragging = true",
        @end="dragging = false"
      )
        template(#item="{ element }")
          .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
            .task-block
              .task-desc
                img(
                  :src="require(`../assets/img/${getImageSrc(element.type)}`)"
                )
                svg(
                  width="24",
                  height="24",
                  viewBox="0 0 24 24",
                  role="presentation"
                )
                  path(
                    d="M16 12c0-1.9-1.3-3.4-3-3.9V4c0-.6-.4-1-1-1s-1 .4-1 1v4.1c-1.7.4-3 2-3 3.9s1.3 3.4 3 3.9V20c0 .6.4 1 1 1s1-.4 1-1v-4.1c1.7-.5 3-2 3-3.9zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
                    fill="currentColor",
                    fill-rule="evenodd"
                  )
              .task-desc 
                h6 {{ element.project }}
                img(src="../assets/img/avatar.png")
</template>

<script lang="ts" setup>
import { Types } from "@/types/interfaceTask";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
  defineEmits,
  watch,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";

const filterTask = inject("filterTask");

const route = useRoute();
const projectKey = route.params.key;
const emit = defineEmits(["projectKeyChanged"]);

const getImageSrc = (type: string) => {
  if (type === "Баг") {
    return "task-bag.svg";
  } else if (type === "Задача") {
    return "task.svg";
  } else {
    return "epic.svg";
  }
};

const enabled = ref(true);
const dragging = ref(false);

// watchEffect(() => {
//   if (
//     typeof filterTask.value === "object" &&
//     !Array.isArray(filterTask.value)
//   ) {
//     const filteredTasks = {};
//     for (const prop in filterTask.value) {
//       filteredTasks[prop] = filterTask.value[prop].filter(
//         (task) => task.project === projectKey
//       );
//     }
//     Object.assign(filterTask.value, filteredTasks);
//   }
// });
</script>

<style scoped lang="scss">
.canban {
  padding: 40px;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  margin-right: 10px;
  background: rgb(244 245 247);
  width: 214px;
  padding: 20px 5px;
  border-radius: 6px;
}
.list-group {
  height: 100%;
}
h3 {
  margin: 0 0 10px 10px;
  color: #42526e;
  span {
    margin-left: 5px;
  }
}

.task-item {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  height: 54px;
  border-radius: 6px;
}
.task-block {
  display: flex;
  justify-content: space-between;
  .task-desc {
    display: flex;
    align-items: center;
    margin-top: 10px;
    img {
      width: 20px;
      height: 20px;
      &:first-child {
        margin-right: 5px;
      }
    }
    h6 {
      padding: 0px;
      margin: 0px 5px 0 0;
    }
  }
}

@media (max-width: 375px) {
  .columns {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
