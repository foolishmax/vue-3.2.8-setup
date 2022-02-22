import router from "./router";
import store from "./store";

const whiteList = ["/login"];

router.beforeEach(async (to, from) => {
  if (store.getters.token) {
    if (to.path === "/login") {
      return "/";
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch("user/getUserInfo");

        const filterRoutes = await store.dispatch(
          "permission/filterRoutes",
          permission.menus
        );

        filterRoutes.forEach((item) => {
          router.addRoute(item);
        });

        return to.path;
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return "/login";
    }
  }
});
