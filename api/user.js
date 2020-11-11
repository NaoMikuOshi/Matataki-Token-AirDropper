import axios from "./index";

export function loginWithEmail(username, password) {
  return axios.post("/login/account", { username, password });
}

export function getUserProfile(uid) {
  return axios.get(`/user/${uid}`);
}
