// store/tasks.js
import { showProjects } from "@/services/api/projectsApi";
import { showFavoriteTasks, showTasks, showTasksByFilter } from "@/services/api/tasksApi";
// import { showUsers } from "@/services/api/userApi";
import { Types } from "@/types/interfaceTask";
import { ProjectsInterface } from "@/types/projectsApiInterface";
import { TasksInterface } from "@/types/tasksApiInterface";
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
    favoriteTasks: [],
    result: [],
    projects: [],
    users: [],
  }),
  getters: {
    result(): Array<TasksInterface> {
      return this.tasks;
    },
    projectsRes(): Array<ProjectsInterface> {
      return this.projects;
    },
    usersRes(): any {
      return this.users;
    },
    tasksFavoritesRes(): Array<TasksInterface> {
      return this.favoriteTasks;
    },
  },
  actions: {
    fetchTasksByFilter(projectValue: any) {
      showTasksByFilter(projectValue).then((res) => {
        if (res) {
          this.tasks = res.data.data.map(
            (task: { attributes: any }) => task.attributes
          );
          console.log(this.tasks);
        }
      });
    },
    fetchTasks() {
      showTasks().then((res) => {
        if (res) {
          this.tasks = res.data.data.map((task: any) => task.attributes);
        }
      });
    },
    fetchFavoriteTasks() {
      showFavoriteTasks().then((res) => {
        if (res) {
          this.favoriteTasks = res.data.data.map((task: any) => task);
        }
      });
    },
    fetchProjects() {
      showProjects().then((res) => {
        if (res) {
          this.projects = res.data.data.map(
            (project: any) => project.attributes
          );
        }
      });
    },
    fetchUsers() {
      // showUsers().then((res: { data: any }) => {
      //   this.users = res.data.name;
      //   console.log("res", this.users);
      // });
    },
  },
});
