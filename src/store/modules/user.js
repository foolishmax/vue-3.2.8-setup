import { getUserInfo, login } from "@/api/sys";
import md5 from "md5";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import { TOKEN } from "@/constant";
import router from "@/router";
import { setTimeStamp } from "@/utils/auth";

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || "",
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            this.commit("user/setToken", data.token);
            router.push("/");
            setTimeStamp();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getUserInfo(context) {
      const res = await getUserInfo();

      this.commit("user/setUserInfo", res);

      return res;
    },
    logout() {
      this.commit("user/setToken", "");
      this.commit("user/setUserInfo", {});
      removeAllItem();
      router.push("/login");
    },
  },
};
