export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
  }),
  mutations: {
    onSidebarOpenedChange(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
  },
};
