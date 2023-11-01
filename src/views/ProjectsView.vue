<template lang="pug">
.projects
  .container
    h1 Projects
    .projects-filter
      .search--block
        input(v-model="searchText", placeholder="Search")
        img
      .projects-filter-category 
        dropdown-component(
          :options="searchNameProjects",
          @input="selectedCategory = $event",
          :defaultState="defaultState"
        ) 
      .projects-filter-category 
        dropdown-component(
          :options="searchLead",
          @input="selectedManager = $event",
          :defaultState="defaultValueManager"
        ) 
    table
      tr
        th.star(
          @click="activeHeader = 'Star'",
          :class="{ active: activeHeader === 'Star' }"
        )
          img.star(:src="require('../assets/img/star.svg')")
        th(
          v-if="ascending",
          @click="activeHeader = 'Name'",
          :class="{ active: activeHeader === 'Name' }"
        )
          .key(@click="sortAscending") Name
        th(
          v-else,
          @click="activeHeader = 'Name'",
          :class="{ active: activeHeader === 'Name' }"
        )
          .key.descending(@click="sortDescending") Name
        th(
          @click="activeHeader = 'Key'",
          :class="{ active: activeHeader === 'Key' }"
        ) Key
        th(
          @click="activeHeader = 'Lead'",
          :class="{ active: activeHeader === 'Lead' }"
        ) Lead
        th(
          @click="activeHeader = 'Issues'",
          :class="{ active: activeHeader === 'Issues' }"
        ) Issues
        th(
          @click="activeHeader = 'Category'",
          :class="{ active: activeHeader === 'Category' }"
        ) Category
      tr(v-for="project in paginatedProjects")
        td(:class="{ 'favorite-project': isFavorite(project) }")
          .key(v-if="isFavorite(project)", @click="deleteFavorite(project)")
          .key.key-second(v-else, @click="addFavorite(project)")
        td 
          img(:src="require(`../assets/img/${project.img}`)")
          router-link(:to="{ name: 'canban', params: { key: project.key } }") {{ project.name }}
        td {{ project.key }}
        td {{ project.head }}
        td {{ project.tasks.data.length }} items
        td {{ project.category }}
    .pagination(v-if="paginatedProjects.length > 10")
      button.arrow.prev(
        @click="goToPage(currentPage - 1)",
        :disabled="currentPage === 1"
      ) 
      .page-numbers
        button(
          v-for="page in totalPages",
          :key="page",
          @click="goToPage(page)",
          :class="{ active: page === currentPage }"
        ) {{ page }}
      button.arrow.next(
        @click="goToPage(currentPage + 1)",
        :disabled="currentPage === totalPages"
      )
</template>
<script lang="ts" setup>
import DropdownComponent from "@/components/DropdownComponent.vue";
import { computed, ref } from "vue";
import { useStore } from "@/store";
import axiosInstance from "@/services/api";
import { addFavoriteTask, deleteFavoriteTask } from "@/services/api/tasksApi";
import { ProjectRes } from "@/types/projectsApiInterface";
const store = useStore();
store.fetchProjects();
store.fetchFavoriteTasks();
store.fetchTasks();
const activeHeader = ref<string | null>(null);
const ascending = ref(true);
const descending = ref(true);

const searchText = ref("");
const defaultState = "Category";
const defaultValueManager = "Manager";

const selectedManager = ref<string | null>(null);
const selectedCategory = ref<string | null>(null);

const currentPage = ref(1);
const isActive = ref(false);

const sortAscending = () => {
  store.projectsRes.sort((a, b) => {
    ascending.value = false;
    descending.value = true;
    return a.name.localeCompare(b.name);
  });
};

const sortDescending = () => {
  store.projectsRes.sort((a, b) => {
    ascending.value = true;
    descending.value = false;
    return b.name.localeCompare(a.name);
  });
};

const totalPages = computed(() => {
  return Math.ceil(searchProjects.value.length / itemsPerPage.value);
});

const itemsPerPage = ref(10);
const paginatedProjects = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return searchProjects.value.slice(startIndex, endIndex);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const searchLead = computed(() => {
  return store.projectsRes.map((project) => project.head);
});
const searchNameProjects = computed(() => {
  return store.projectsRes.map((project) => project.name);
});

const searchProjects = computed(() => {
  let filteredProjects = store.projectsRes;
  if (searchText.value.trim()) {
    const searchTerm = searchText.value.trim().toLowerCase();
    filteredProjects = filteredProjects.filter((project) => {
      const name = project.name.toLowerCase();
      return name.includes(searchTerm);
    });
  }
  if (selectedManager.value) {
    filteredProjects = filteredProjects.filter((project) => {
      return project.head === selectedManager.value;
    });
  }
  if (selectedCategory.value) {
    filteredProjects = filteredProjects.filter((project) => {
      return project.name === selectedCategory.value;
    });
  }

  return filteredProjects;
});

const isFavorite = (project: ProjectRes) => {
  const projectName = project.name.toLowerCase();
  return store.favoriteTasks.some(
    (favoriteTask) => favoriteTask.attributes.name.toLowerCase() === projectName
  );
};

const addFavorite = (project: ProjectRes) => {
  let data = {
    data: {
      name: project.name,
    },
  };
  addFavoriteTask(data).then((res) => {
    console.log(res);
  });
};
const deleteFavorite = (project: ProjectRes) => {

  console.log(project);
  const projectName = project.name.toLowerCase();

  const matchingFavorite = store.favoriteTasks.find((favoriteTask) => {
    const name = favoriteTask.attributes.name.toLowerCase();
    return name === projectName;
  });

  if (matchingFavorite) {
    const matchingId = matchingFavorite.id;
    console.log("Matching Id:", matchingId);
    deleteFavoriteTask(matchingId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/core/colors";
.projects {
  height: 100vh;
  background: $light-green;
  h1 {
    margin: 0;
    padding: 28px 0;
    color: #0b0f0a;
    font-family: var(--font-inter);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
  }
  .projects-filter {
    display: flex;
    &-category {
      margin-left: 16px;
    }
  }
  .search--block {
    position: relative;
    input {
      position: relative;
      display: flex;
      width: 300px;
      height: 44px;
      padding: 0px 44px;
      align-items: center;
      gap: 8px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 1px solid $secondary_b_c_1;
      background: #fff;
      cursor: pointer;
      outline: none;
      &::placeholder {
        color: $disabled_button_label;
        font-family: var(--font-inter);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        margin-left: 44px;
      }
    }
    img {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      margin-left: 5px;
      background-color: black;
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-image: url("../assets/img/search.svg");
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 40px 0 0;
    position: absolute;
    bottom: 36px;
    right: 80px;
    .page-numbers {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    button {
      cursor: pointer;
      color: #0b0f0a;
      font-family: var(--font-inter);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      display: flex;
      width: 44px;
      height: 44px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border: none;
      background: transparent;
      flex-shrink: 0;
      &.active {
        border-radius: 8px;
        background: #79a276;
      }
      &.arrow {
        display: flex;
        width: 16px;
        height: 16px;
        margin-left: 5px;
        background-color: #79a276;
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-image: url("../assets/img/arrow.svg");
        &.prev {
          transform: rotate(180deg);
          margin-right: 18px;
        }
        &.next {
          margin-left: 18px;
        }
      }
      &:disabled {
        cursor: not-allowed;
        background-color: #d6d6d6;
      }
    }
  }

  table {
    width: 100%;

    th {
      border-bottom: 1px solid #cbcbcb;
      text-align: left;
      color: #0b0f0a;
      font-family: var(--font-inter);
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      padding: 16px 0 0 0;
      .key::before {
        content: "";
        display: inline-block;
        height: 30px;
        width: 30px;
        background: url("../assets/img/key.svg");
        margin-right: 16px;
      }
      .key.descending::before {
        background: url("../assets/img/key-boyyom.svg");
      }
      .key {
        display: flex;
        align-items: center;
      }
      &.active {
        border-bottom: 1px solid #597b56;
      }
      .star {
        display: block;
        margin: 5px auto;
      }
    }
    td {
      padding: 10px 8px;
      img {
        width: 20px;
        margin-right: 10px;
      }
      a {
        color: black;
        text-decoration: none;
      }
      button {
        border: none;
        background: transparent;
      }
      .key {
        content: "";
        display: block;
        background-image: url("../assets/img/star.svg");
        width: 32px;
        height: 32px;
        margin: 0 auto;
        background-repeat: no-repeat;
      }
      .key.key-second {
        background-image: url("../assets/img/star2.svg");
      }
    }
  }
  &--block-item {
    width: 300px;
    min-height: 100px;
    background: #d4d8dd;
    border-radius: 6px;
    margin: 30px 0;
    padding: 15px;
    display: flex;
    align-items: center;
    a {
      font-size: 24px;
      text-decoration: none;
      color: black;
      text-align: center;
      margin-left: 10px;
    }
    img {
      width: 40px;
    }
  }
}
</style>
