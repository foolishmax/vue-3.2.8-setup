import store from "@/store";
import axios from "axios";
import { ElMessage } from "element-plus";
import { isCheckTimeout } from "./auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

const checkTimeout = () => {
  if (isCheckTimeout()) {
    store.dispatch("user/logout");

    return Promise.reject(new Error("invalid token"));
  }
};

service.interceptors.request.use((config) => {
  const token = store.getters.token;

  if (token) {
    checkTimeout();

    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Accept-Language"] = store.getters.language;
  config.headers.icode = "E2DA1793FF212E06";

  return config;
});

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;

    if (success) {
      return data;
    } else {
      ElMessage.error(message);

      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    if (error.response?.data?.code === 401) {
      store.dispatch("user/logout");
    }

    ElMessage.error(error.message);

    return Promise.reject(error);
  }
);

export default service;
