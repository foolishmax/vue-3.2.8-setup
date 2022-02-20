<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
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
  width: 100%;
  height: calc(100vh - 50px - 35px);
  padding: 20px;
  position: absolute;
  top: 85px;
  overflow: hidden;
  box-sizing: border-box;

  & > div {
    width: 100%;
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
