import { THEME_COLOR } from "@/constant";
import { getItem } from "@/utils/storage";
import { generateColors } from "@/utils/theme";

const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== "{}",
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(THEME_COLOR)),
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  themeColor: (state) => state.theme.themeColor,
  tags: (state) => state.app.tags,
};

export default getters;
