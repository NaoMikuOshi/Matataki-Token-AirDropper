import axios from "./index";

export function getTokenProfile(id) {
  return axios.get(`/minetoken/${id}`);
}

export function getTokenList() {
  return axios.get("/token/tokenlist", {
    params: {
      pagesize: 999,
      order: 0,
    },
  });
}
