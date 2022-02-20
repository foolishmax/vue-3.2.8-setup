import { createI18n } from "vue-i18n";
import zh_lang from "./lang/zh";
import en_lang from "./lang/en";
import store from "@/store";

const messages = {
  en: {
    msg: en_lang,
  },
  zh: {
    msg: zh_lang,
  },
};

const i18n = createI18n({
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: store.getters.language,
  messages,
});

export default i18n;
