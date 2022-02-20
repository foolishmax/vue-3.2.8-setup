import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import installIcons from "@/icons";
import i18n from "./i18n";

// 初始化样式表
import "@/styles/index.scss";
// 权限验证
import "./permission";

const app = createApp(App);
installElementPlus(app);
installIcons(app);
app.use(store).use(i18n).use(router).mount("#app");
