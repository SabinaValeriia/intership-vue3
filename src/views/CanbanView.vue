<template lang="pug">
.canban
  h2 Дошка Kanban
  .columns
    .column
      h3 To Do
        span {{ tasks.toDo.length }}
      draggable.list-group(
          v-model="tasks.toDo",
          group="tasksGroup",
          :disabled="!enabled",
          item-key="name",
          ghost-class="ghost",
          :move="checkMove",
          @start="dragging = true",
          @end="dragging = false"
        )
          template(#item="{ element }")
            .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
              .task-block
                .task-desc
                  img(
                    src="https://onix-systems.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
                    alt="Баг"
                  )
                  img(
                    src="https://onix-systems.atlassian.net/images/icons/priorities/medium.svg",
                    alt="Приоритет Normal"
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
                  h6 {{ $route.params.key }}
                  img(src="../assets/img/avatar.png")
    .column
      h3 In Progress
        span {{ tasks.inProgress.length }}
      draggable.list-group(
        v-model="tasks.inProgress",
        group="tasksGroup",
        :disabled="!enabled",
        item-key="name",
        ghost-class="ghost",
        :move="checkMove",
        @start="dragging = true",
        @end="dragging = false"
      )
        template(#item="{ element }")
          .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
            .task-block
              .task-desc
                img(
                  src="https://onix-systems.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
                  alt="Баг"
                )
                img(
                  src="https://onix-systems.atlassian.net/images/icons/priorities/medium.svg",
                  alt="Приоритет Normal"
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
                h6 {{ $route.params.key }}
                img(src="../assets/img/avatar.png")

    .column
      h3 Review
        span {{ tasks.review.length }}
      draggable.list-group(
          v-model="tasks.review",
          group="tasksGroup",
          :disabled="!enabled",
          item-key="name",
          ghost-class="ghost",
          :move="checkMove",
          @start="dragging = true",
          @end="dragging = false"
        )
          template(#item="{ element }")
            .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
              .task-block
                .task-desc
                  img(
                    src="https://onix-systems.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
                    alt="Баг"
                  )
                  img(
                    src="https://onix-systems.atlassian.net/images/icons/priorities/medium.svg",
                    alt="Приоритет Normal"
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
                  h6 {{ $route.params.key }}
                  img(src="../assets/img/avatar.png")
    .column
      h3 Done
        span {{ tasks.done.length }}
      draggable.list-group(
          v-model="tasks.done",
          group="tasksGroup",
          :disabled="!enabled",
          item-key="name",
          ghost-class="ghost",
          :move="checkMove",
          @start="dragging = true",
          @end="dragging = false"
        )
          template(#item="{ element }")
            .task-item(:class="{ 'not-draggable': !enabled }") {{ element.name }}
              .task-block
                .task-desc
                  img(
                    src="https://onix-systems.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
                    alt="Баг"
                  )
                  img(
                    src="https://onix-systems.atlassian.net/images/icons/priorities/medium.svg",
                    alt="Приоритет Normal"
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
                  h6 {{ $route.params.key }}
                  img(src="../assets/img/avatar.png")
</template>

<script lang="ts" setup>
import { defineComponent, inject, ref } from "vue";
import draggable from "vuedraggable";
const tasks = inject("tasks");

const onTasksChange = (columnType: string) => {
  console.log(columnType);
};
const enabled = ref(true);
const dragging = ref(false);
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
