<template lang="pug">
.container-work 
    .your-work
        h1 Ваша робота
        .block
            h3 Нещодавні проекти 
            router-link(:to="{ name: 'projects' }") Всі проєкти
        .your-work--block
            .your-work--block-item(v-for="work in works")
                img(:src="require(`../assets/img/${work.img}`)")
                .item
                    h4 {{ work.name }}
                    p {{ work.desc }}
                    h5 швидкі посилання 
                    h6 Мої відкриті задачі
                    h6 Виконані задачі
                    h6 {{ work.board}} дoшка
</template>

<script lang="ts" setup>
import { ref } from "vue";

const works = [
  {
    name: "onix-time-manager",
    desc: "Програмное обеспечение",
    board: 1,
    img: "project1.svg",
  },
  {
    name: "Goals",
    desc: "Бизнес-проект, управляемый компанией",
    board: 1,
    img: "project1.svg",
  },
  {
    name: "Onix: Resource Exchange",
    desc: "Програмное обеспечение",
    board: 0,
    img: "project1.svg",
  },
  {
    name: "Pre-Sale II",
    desc: "Програмное обеспечение",
    board: 0,
    img: "project1.svg",
  },
];
</script>

<style lang="scss">
.container-work {
  margin: 0 90px;
}
.your-work {
    h1 {

    }
    .block {
        display: flex;
        justify-content: space-between;
    }
  &--block {
    display: flex;
    gap: 16px;
    &-item {
      height: 168px;
      width: 240px;
      border-left: 20px solid #ffbdad;
      border-radius: 3px;
      display: flex;
      box-sizing: border-box;
      box-shadow: var(
        --ds-shadow-raised,
        0 1px 1px rgba(9, 30, 66, 0.25),
        0 0 1px rgba(9, 30, 66, 0.31)
      );
      transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
      img {
        height: 24px;
        margin: 20px 0 0 -11px;
      }
      .item {
        margin: 0 0 0 10px;
        h4 {
          margin: 18px 0 0;
          font-size: 14px;
        }
        h5 {
          font-size: 11px;
          color: #6b778c;
          text-transform: uppercase;
          margin: 15px 0;
        }
        h6 {
          font-size: 11px;
          color: #172b4d;
          margin: 10px 0;
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
