import { getItem, setItem } from "@/utils/storage";
import { THEME_COLOR, DEFAULT_COLOR } from "@/constant";
import variables from "@/styles/variables.scss";

export default {
  namespaced: true,
  state: () => ({
    themeColor: getItem(THEME_COLOR) || DEFAULT_COLOR,
    variables,
  }),
  mutations: {
    setThemeColor(state, newColor) {
      state.themeColor = newColor;
      state.variables.menuBg = newColor;

      setItem(THEME_COLOR, newColor);
    },
  },
  actions: {},
};
