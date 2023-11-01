import axiosInstance from ".";

export const showTasksByFilter = (projectValue: any) => {
  return axiosInstance.get(`tasks?populate=*&filters[project]=${projectValue}`);
}
export const showTasks = () => {
  return axiosInstance.get("tasks?populate=*");
}
export const createTask = (taskData: string, headers?: any) => {
  return axiosInstance.post("tasks", taskData, headers);
}
export const deleteTask = (taskId: number) => {
  return axiosInstance.delete(`tasks/${taskId}`);
}
export const updateTask = (taskId: number, taskData: string, headers?: any) => {
  return axiosInstance.put(`tasks/${taskId}`, taskData, headers);
}

export const showFavoriteTasks = () => {
  return axiosInstance.get("favorites?populate=*");
}

export const addFavoriteTask = (data: object) => {
  return axiosInstance.post("favorites", data);
}
export const deleteFavoriteTask = (taskId: number) => {
  return axiosInstance.delete(`favorites/${taskId}`);
}
