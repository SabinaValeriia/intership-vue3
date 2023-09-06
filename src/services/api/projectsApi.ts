import axiosInstance from ".";

export const showProjects = () => {
  return axiosInstance.get("projects");
};
