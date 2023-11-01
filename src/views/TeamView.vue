<template lang="pug">
.team
  .team--block
    h1 People and teams
    input(
      type="search",
      v-model="searchText",
      placeholder="Search for people and teams"
    )
    h2 You work with
    .team--people
      .team--people-block(v-for="people in filteredTeams")
        img(
          :src="require(`../assets/img/${people.avatar.name}`)"
        )
        h3 {{ people.name }}
        p {{ people.department.data.attributes.name }}
</template>

<script lang="ts" setup>
import {showTeams} from "@/services/api/teamsApi";
import { computed, inject, ref } from "vue";
let teams = ref([]);
const searchText = ref("");
showTeams().then((res) => {
  if (res) {
    teams.value = res.data.data.map((team: any) => team.attributes);
  }
});

const filteredTeams = computed(() => {
  if (!searchText.value.trim()) {
    return teams.value;
  }

  const searchTerm = searchText.value.trim().toLowerCase();
  return teams.value.filter((people) => {
    const name = people.name.toLowerCase();
    return name.includes(searchTerm);
  });
});
</script>

<style lang="scss">
.team {
  width: 100%;
  &--block {
    width: 920px;
    margin: 0 auto;
    h1 {
      font-size: 24px;
      line-height: 28px;
      color: #172b4d;
      margin: 24px 0 32px;
    }
    input {
      width: 100%;
      height: 40px;
      transition: border-bottom-color 0.25s ease-in-out 0s;
      border-bottom: 2px solid #b3bac5;
      border-top: none;
      border-left: none;
      border-right: none;
      padding: 0 5px;
      outline: none;
    }
  }
  &--people {
    display: flex;
    gap: 8px;
    &-block {
      width: 147px;
      height: 180px;
      border: 1px solid #d6d9de;
      box-sizing: border-box;
      box-shadow: var(
        --ds-shadow-raised,
        0 1px 1px rgba(9, 30, 66, 0.25),
        0 0 1px rgba(9, 30, 66, 0.31)
      );
      transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
      border-radius: 6px;
      img {
        border-radius: 50%;
        width: 72px;
        display: block;
        margin: 20px auto;
      }
      p {
        color: #6b778c;
        font-size: 11px;
        line-height: 16px;
        text-align: center;
      }
      h3 {
        text-align: center;
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
