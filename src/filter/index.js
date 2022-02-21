import dayjs from "dayjs";
import rt from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import store from "@/store";

const dateFilter = (value, format = "YYYY-MM-DD") => {
  if (!isNaN(value)) {
    value = parseInt(value);
  }

  return dayjs(value).format(format);
};

dayjs.extend(rt);

const relativeTime = (value) => {
  if (!isNaN(value)) {
    value = parseInt(value);
  }

  return dayjs()
    .locale(store.getters.language === "zh" ? "zh-cn" : "en")
    .to(dayjs(value));
};

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime,
  };
};
