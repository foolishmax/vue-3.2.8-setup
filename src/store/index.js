import { createStore } from "vuex";
import user from "./modules/user.js";
import getters from "./getters";
import app from "./modules/app.js";

export default createStore({
  getters,
  modules: {
    user,
    app,
  },
});
