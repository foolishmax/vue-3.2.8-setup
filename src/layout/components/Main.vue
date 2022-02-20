<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { isTags } from "@/utils/tags";
import { useStore } from "vuex";
import { generateTitle, watchSwitchLang } from "@/utils/i18n";

const route = useRoute();
const store = useStore();

const getTitle = (route) => {
  let title = "";

  if (!route.meta) {
    title = route.path.split("/").splice(-1);
  } else {
    title = generateTitle(route.meta.title);
  }

  return title;
};

watch(
  route,
  (to, from) => {
    console.log(123);
    if (!isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;

    store.commit("app/addTags", {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);

watchSwitchLang(() => {
  store.getters.tags.forEach((route, index) => {
    store.commit("app/changeTagView", {
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  top: 85px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
