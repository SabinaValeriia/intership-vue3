<template lang="pug">
.canban
  .canban--block
    h2 Дошка Kanban
    .aselect(:data-value="value", :data-list="typeTasks")
      .selector(@click="toggle()")
        .label
          span Тип: {{ valueTask }}
        .arrow(:class="{ expanded: visible }")
        div(:class="{ hidden: !visible, visible }")
          ul
            li(
              :class="{ current: item === value }",
              v-for="item in typeTasks",
              @click="select(item); applyFilter()"
            ) {{ item }}
    .aselect(:data-value="value", :data-list="statusTasks")
      .selector(@click="toggleStatus()")
        .label
          span Статус: {{ valueStatus }}
        .arrow(:class="{ expanded: visibleStatus }")
        div(:class="{ hidden: !visibleStatus, visibleStatus }")
          ul
            li(
              :class="{ current: item === valueStatus }",
              v-for="item in statusTasks",
              @click="selectStatus(item); applyFilter()"
            ) {{ item }}
  .columns
    .column(v-for="valueTask in valueTasks")
      h3 {{ valueTask.name }}
      draggable.list-group(
        v-model="filterTask[valueTask.value]",
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
                p {{ element.team.data.attributes.name.charAt(0) }}
</template>

<script lang="ts" setup>
import { showTasksByFilter } from "@/services/api/tasksApi";
import { useTasksStore } from "@/store";
import { Types } from "@/types/interfaceTask";
import {
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
const typeTasks = ref(["Баг", "Задача", "Епік", "Всі"]);
const statusTasks = ref(["To Do", "In Progress", "Review", "Done", "Всі"]);
const visible = ref(false);
const visibleStatus = ref(false);
const valueTask = ref("Всі");
const valueStatus = ref("Всі");
const tasks = ref([]);
const filterTask = ref([]);
const route = useRoute();
const projectKey = route.params.key;
const enabled = ref(true);
const dragging = ref(false);
const projectValue = route.params.key;


const valueTasks = [
  {
    name: "To Do",
    value: "toDo",
  },
  {
    name: "In Progress",
    value: "inProgress",
  },
  {
    name: "Review",
    value: "review",
  },
  {
    name: "Done",
    value: "done",
  },
];
const tasksStore = useTasksStore();

tasksStore.fetchTasksByFilter(projectValue);

const toggle = () => {
  visible.value = !visible.value;
};
const toggleStatus = () => {
  visibleStatus.value = !visibleStatus.value;
};
const select = (option) => {
  valueTask.value = option;
};

const selectStatus = (option) => {
  valueStatus.value = option;
};

const applyFilter = () => {
  if (typeof filterTask.value === "object") {
    for (const prop in filterTask.value) {
      filterTask.value[prop] = filterTask.value[prop].filter((task) => {
        const typeMatch =
          valueTask.value === "Всі" || task.type === valueTask.value;
        const statusMatch =
          valueStatus.value === "Всі" || task.typeColumn === valueStatus.value;
        return typeMatch && statusMatch;
      });
    }
  }
};



const filteredTasks = () => {
  if (Array.isArray(tasksStore.result)) {
    console.log(tasksStore.result);
    const filteredToDo = tasksStore.result.filter(
      (task) => task.typeColumn === Types.toDo
    );

    const filteredInProgress = tasksStore.result.filter(
      (task) => task.typeColumn === Types.inProgress
    );

    const filteredReview = tasksStore.result.filter(
      (task) => task.typeColumn === Types.review
    );

    const filteredDone = tasksStore.result.filter(
      (task) => task.typeColumn === Types.done
    );

    filterTask.value = {
      toDo: filteredToDo,
      inProgress: filteredInProgress,
      review: filteredReview,
      done: filteredDone,
    };
    console.log(2);
  } else {
    filterTask.value = {
      toDo: [],
      inProgress: [],
      review: [],
      done: [],
    };
    console.log(1);
  }
};
filteredTasks();
console.log(filterTask.value);

const getImageSrc = (type: string) => {
  if (type === "Баг") {
    return "task-bag.svg";
  } else if (type === "Задача") {
    return "task.svg";
  } else {
    return "epic.svg";
  }
};
watch([valueTask, valueStatus], () => {
  applyFilter();
});
</script>

<style scoped lang="scss">
.aselect {
  min-width: 200px;
  margin: 10px;
  .selector {
    border: none;
    background: #f8f8f8;
    position: relative;
    z-index: 1;
    .arrow {
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid #888;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .label {
      display: block;
      padding: 12px;
      font-size: 16px;
      color: #888;
    }
  }
  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #fff;
  }
  li {
    padding: 12px;
    color: #666;
    &:hover {
      color: white;
      background: seagreen;
    }
  }
  .current {
    background: #eaeaea;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}
.canban {
  padding: 40px;
  &--block {
    display: flex;
    align-items: center;
  }
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
  min-height: 54px;
  border-radius: 6px;
}
.task-block {
  display: flex;
  justify-content: space-between;
  height: 30px;
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
    p {
      background: #76b0ef;
      padding: 7px;
      border-radius: 36px;
      width: 18px;
      text-align: center;
    }
    h6 {
      padding: 0px;
      margin: 0px 5px 0 0;
    }
  }
}

@mixin media_mobile {
  .columns {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
