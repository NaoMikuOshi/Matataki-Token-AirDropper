import { withReduxDevtools, withLogger } from "undux";
import { disassemble } from "../utils";
import { getUserProfile } from "../api/user";

let effects = (store) => {
  store.on("accessToken").subscribe((accessToken) => {
    const user = disassemble(accessToken);
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
