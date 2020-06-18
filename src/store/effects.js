import { withReduxDevtools, withLogger } from "undux";
let effects = (store) => {
  store
    .on("buttonText")
    .subscribe((buttonText) =>
      console.log("The user updated buttonText to", buttonText)
    );
  withReduxDevtools(store);
  // Disable this in production
  if (process.env.NODE_ENV === "development") {
    withLogger(store);
  }
  return store;
};

export default effects;
