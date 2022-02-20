import { LANG, TAGS_VIEW } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || "zh",
    tags: getItem(TAGS_VIEW) || [],
  }),
  mutations: {
    onSidebarOpenedChange(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },

    setLanguage(state, lang) {
      setItem(LANG, lang);

      state.language = lang;
    },

    addTags(state, tag) {
      const isExist = state.tags.find((item) => {
        return item.path === tag.path;
      });

      if (!isExist) {
        state.tags.push(tag);

        setItem(TAGS_VIEW, state.tags);
      }
    },

    changeTagView(state, { tag, index }) {
      state.tags[index] = tag;

      setItem(TAGS_VIEW, state.tags);
    },
  },
};
