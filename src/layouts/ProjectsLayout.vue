<template lang="pug">
.display
        .side-bar
            ul.tabs(:class="{ active: hide }")
                li.tab(:class="{ active: currentTab === 1 }")
                    img(src="../assets/img/tasks.png")
                    router-link(:to="{ name: 'projectsTasks', params: { key: $route.params.key }}") Задачі
                li.tab(:class="{ active: currentTab === 3 }")
                    img(src="../assets/img/board.svg")
                    router-link(:to="{ name: 'canban'}") Дошка KANBAN 
                li.tab(:class="{ active: currentTab === 3 }")
                    img(src="../assets/img/board.svg")
                    router-link(:to="{name: 'archive'}") Архів
            button.close(@click="hideBar" :class="{ active: hide }")
        router-view
</template>

<style lang="scss">
@import "../styles/core/colors";
body {
  margin: 0;
}
.tablet {
  display: block;
  &--block {
    display: flex;
  }
}
.mobile {
  display: none;
}
.display {
  display: flex;
}
.side-bar {
  display: flex;
  margin: 0;
  .tab-item {
    margin-left: 30px;
  }
  .tab-content {
    &.active {
      transform: translate(-210px, 10px);
    }
  }
  .close {
    height: 30px;
    margin: 240px -18px;
    width: 30px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    z-index: 1;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-right: 9px solid #8cb2dc;
      margin-right: 3px;
    }
  }
  .close.active {
    transform: translate(-230px, 0px);
    &::after {
      border-left: 9px solid #8cb2dc;
      margin-right: -3px;
      border-right: none;
    }
  }
  ul.active {
    transform: translate(-230px, 0px);
  }
  ul {
    background: url("../assets/img/bg-tablet.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    width: 240px;
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      &.active {
        border-radius: 6px;
        background: #d4d8dc;
      }

      img {
        margin-right: 10px;
        height: 24px;
      }
      a {
        font-family: "Inter", sans-serif;
        font-size: 18px;
        line-height: 20px;
        color: $black;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .close {
      position: absolute;
      right: -22px;
    }
  }
}
@media (max-width: 768px) {
  #tab3-content {
    display: block !important;
  }
  .side-bar {
    display: none;
  }
  .background {
    background: url("../assets/img/bg-tablet.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 30px;
  }
}
@media (max-width: 768px) {
  .tablet {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
