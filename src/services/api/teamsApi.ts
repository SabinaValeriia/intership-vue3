import axiosInstance from "../api";

export const showTeams = () => {
  return axiosInstance.get("teams?populate=*");
};
