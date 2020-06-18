import axios from "./index";

export function getUserProfile(uid) {
  return axios.get(`/user/${uid}`);
}
