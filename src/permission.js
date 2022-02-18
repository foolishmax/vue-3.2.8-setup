import router from "./router";
import store from "./store";

const whiteList = ["/login"];

router.beforeEach(async (to, from) => {
  if (store.getters.token) {
    if (to.path === "/login") {
      return "/";
    } else {
      if (!store.getters.hasUserInfo) {
        await store.dispatch("user/getUserInfo");
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return "/login";
    }
  }
});
