import { withReduxDevtools, withLogger } from "undux";
import { disassemble } from "../utils";
import { getUserProfile } from "../api/user";
import { setCookie } from "../utils/cookie";

let effects = (store) => {
  store.on("accessToken").subscribe((accessToken) => {
    setCookie("ACCESS_TOKEN", accessToken, { expires: 1, path: "/" });
    const user = disassemble(accessToken);
    store.set("atData")(user);
    if (!user.id) {
      return;
    }
    getUserProfile(user.id).then((profile) => {
      store.set("userInfo")(profile.data);
    });
  });

  withReduxDevtools(store);
  // Disable this in production
  if (process.env.NODE_ENV === "development") {
    withLogger(store);
  }
  return store;
};

export default effects;
