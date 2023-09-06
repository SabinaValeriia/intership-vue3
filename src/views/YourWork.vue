<template lang="pug">
.background-work
  .container-work 
    .your-work
      h1 Your work
      .block
        h3 Recent projects
        router-link(:to="{ name: 'projects' }") View all projects
      .your-work--block
        .your-work--block-item(v-for="project in tasksStore.projectsRes")
          img(:src="require(`../assets/img/${project.img}`)")
          .item
            router-link(:to="{ name: 'canban', params: { key: project.key } }") {{ project.name }}
            h5 Quick links
            h6 My open issues
            h6.distance Done issues
            h6 Members
      .tab-buttons
        button(@click="showTab(0)", :class="{ active: activeTab === 0 }")
          | Worked on
        button(@click="showTab(1)", :class="{ active: activeTab === 1 }")
          | Assigned to me
        button(@click="showTab(2)", :class="{ active: activeTab === 2 }")
          | Starred
      .tab-content
        div(v-show="activeTab === 0")
          .tasks--block(v-for="task in tasksStore.result")
            .block-content
              div
                img(
                  v-if="task.type === 'Баг'",
                  src="../assets/img/fix.svg",
                  alt="Баг"
                ) 
                img(
                  src="../assets/img/task.svg",
                  v-else-if="task.type === 'Задача'"
                )
                img(src="../assets/img/epic.svg", v-else)
              div
                h7 {{ task.name }}
                .tasks--block-item
                  p {{ task.typeColumn }}
                    i.dot
                  p 123
                    i.dot
                  p {{ task.key.data.attributes.name }}
            .block-img
              img(
                :src="require(`../assets/img/${task.team.data.attributes.avatar.name}`)"
              )
        div(v-show="activeTab === 1") 
          .tasks--block(v-for="task in tasksStore.result")
            .block-content(
              v-if="tasksStore.usersRes === task.team.data.attributes.name"
            )
              div
                img(
                  v-if="task.type === 'Баг'",
                  src="../assets/img/fix.svg",
                  alt="Баг"
                ) 
                img(
                  src="../assets/img/task.svg",
                  v-else-if="task.type === 'Задача'"
                )
                img(src="../assets/img/epic.svg", v-else)
              div
                h7 {{ task.name }}
                .tasks--block-item
                  p 123
                    i.dot
                  p {{ task.key.data.attributes.name }}
            .block-img(
              v-if="tasksStore.usersRes === task.team.data.attributes.name"
            )
              p {{ task.typeColumn }}
        div(v-show="activeTab === 2") Content for Tab 3
</template>

<script lang="ts" setup>
import { showUsers } from "@/services/api/userApi";
import { useTasksStore } from "@/store";
import { ref } from "vue";
const activeTab = ref(0);
const users = ref({});

const showTab = (tabIndex: number) => {
  activeTab.value = tabIndex;
};

const tasksStore = useTasksStore();
tasksStore.fetchTasks();
tasksStore.fetchProjects();
tasksStore.fetchUsers();
</script>

<style lang="scss">
.background-work {
  background: #e7eee7;
}
.container-work {
  margin: 0 90px;
}
.your-work {
  .tab-content {
    padding-bottom: 20px;
  }
  .tab-buttons {
    border-bottom: 1px solid #cbcbcb;
    margin: 56px 0 20px;
    button {
      border: none;
      background: transparent;
      font-family: var(--font-inter);
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px;
      color: #0b0f0a;
      margin-right: 20px;
      &.active {
        color: #597b56;
        border-bottom: 1px solid #597b56;
      }
    }
  }
  h1 {
    color: #0b0f0a;
    font-family: var(--font-inter);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    margin: 0;
    padding: 28px 0;
    border-bottom: 1px solid #cbcbcb;
  }
  .tasks--block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .block-content {
      display: flex;
      margin-bottom: 13px;
    }
    .block-img {
      img {
        width: 30px;
        border-radius: 16px;
        margin: 0;
      }
    }
    img {
      margin-right: 16px;
    }
    &-item {
      display: flex;
      align-items: center;
    }
    p {
      display: flex;
      align-items: center;
      color: #8a8a8a;
      font-family: var(--font-inter);
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      margin: 0;
      i.dot {
        display: block;
        content: "";
        background: url("../assets/img/dot.svg");
        width: 4px;
        height: 5px;
        margin: 0 12px;
      }
    }
    h7 {
      color: #0b0f0a;
      font-family: var(--font-inter);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      margin: 0;
    }
  }
  .block {
    display: flex;
    justify-content: space-between;
    padding: 16px 0 20px;
    h3 {
      margin: 0;
      color: #0b0f0a;
      font-family: var(--font-inter);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
    }
    a {
      color: #0065ff;
      font-family: var(--font-inter);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      text-decoration: none;
    }
  }
  &--block {
    display: flex;
    gap: 16px;
    &-item {
      position: relative;
      height: 206px;
      min-width: 260px;
      border-left: 40px solid #ffbdad;
      border-radius: 4px;
      background: #e0e7df;
      box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.25);
      padding: 20px 24px;
      display: flex;
      box-sizing: border-box;
      transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
      img {
        height: 34px;
        position: absolute;
        top: 20px;
        left: -20px;
      }
      .item {
        a {
          text-decoration: none;
          font-weight: bold;
          color: #0b0f0a;
          font-family: var(--font-inter);
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 28px;
          margin: 00;
        }
        h5 {
          color: #757b74;
          font-family: var(--font-inter);
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
          text-transform: uppercase;
          margin: 16px 0 10px;
        }
        h6 {
          color: #0b0f0a;
          font-family: var(--font-inter);
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          &.distance {
            margin: 10px 0;
          }
        }
        p {
          margin: 0;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
        }
      }
    }
  }
}
</style>
