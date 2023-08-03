import { TasksInterface } from './../../types/tasksApiInterface';
import ApiService from "../api";

const tasksApi = {
  showTasks() {
    return ApiService.get("tasks?populate=*");
  },
  createTask(taskData: string, headers?: any) {
    return ApiService.post("tasks", taskData, headers);
  },
  deleteTask(taskId: number) {
    return ApiService.delete(`tasks/${taskId}`);
  },
  updateTask(taskId: number, taskData: string, headers?: any) {
    return ApiService.put(`tasks/${taskId}`, taskData, headers);
  },
};

export default tasksApi;
