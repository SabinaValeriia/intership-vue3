// store/tasks.js
import { showProjects } from "@/services/api/projectsApi";
import { showTasks, showTasksByFilter } from "@/services/api/tasksApi";
import { showUsers } from "@/services/api/userApi";
import { Types } from "@/types/interfaceTask";
import { ProjectsInterface } from "@/types/projectsApiInterface";
import { TasksInterface } from "@/types/tasksApiInterface";
import { defineStore } from "pinia";

export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
    result: [],
    projects: [],
    users: [],
  }),
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
      const jwtToken = localStorage.getItem("isAuthenticated");
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      showUsers(headers).then((res: { data: any }) => {
        this.users = res.data.name;
        console.log("res", this.users)
      });
    },
  },
  getters: {
    result(): Array<TasksInterface> {
      console.log(this.tasks);
      return this.tasks;
    },
    projectsRes(): Array<ProjectsInterface> {
      return this.projects;
    },
    usersRes(): any {
      return this.users;
    },
  },
});
