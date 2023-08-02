import { ProjectsInterface } from "@/types/projectsApiInterface";
import ApiService from "../api";

const projectsApi = {
  showProjects() {
    return ApiService.get("projects");
  },
};

export default projectsApi;
