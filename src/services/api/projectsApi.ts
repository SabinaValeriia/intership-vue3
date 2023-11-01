import axiosInstance from ".";

export const showProjects = () => {
  return axiosInstance.get("projects?populate=*");
};

export const deleteFavoritesProject = (project: number) => {
  return axiosInstance.delete(`favorites/${project}`);
}

export const updateProject = (projectId: number, projectData: string, headers?: any) => {
  return axiosInstance.put(`favorites?populate=*/${projectId}`, projectData);
  // return axiosInstance.get(`favorites?populate=*/${projectId}`, projectData, headers);
}
