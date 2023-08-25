import ApiService from "../api";

const teamsApi = {
  showTeams() {
    return ApiService.get("teams?populate=*");
  },
};

export default teamsApi;
