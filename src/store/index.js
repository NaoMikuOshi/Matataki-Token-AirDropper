import { createConnectedStore } from "undux";
import effects from "./effects";

// Declare your store's initial state.
const initialState = {
  accessToken: "",
  userInfo: {},
};

const Store = createConnectedStore(initialState, effects);
// Create & export a store with an initial value.
export default Store;
const { withStore, useStore } = Store;
export { withStore, useStore };
