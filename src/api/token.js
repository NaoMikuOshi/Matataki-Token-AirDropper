import axios from "./index";

export function getTokenProfile(id) {
  return axios.get(`/minetoken/${id}`);
}
