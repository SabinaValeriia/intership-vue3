import {
  AuthUserInterface,
  CreateUserInterface,
  ResUser,
} from "@/types/userApiInterface";
import axiosInstance from "../api";

export const loginUser = (userData: AuthUserInterface) => {
  return axiosInstance.post<ResUser>("auth/local", userData);
};
export const registerUser = (userData: CreateUserInterface) => {
  return axiosInstance.post<ResUser>("auth/local/register", userData);
};

export const showUsers = (headers: object) => {
  return axiosInstance.get("users/me?populate=*", headers);
};
