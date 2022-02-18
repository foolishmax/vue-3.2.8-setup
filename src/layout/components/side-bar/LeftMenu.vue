<template>
  <el-menu
    :unique-opened="true"
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    class="el-menu-vertical"
    router
  >
    <menu-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route.js";
import { computed } from "vue";
import MenuItem from "./MenuItem.vue";

const router = useRouter();
const route = useRoute();

const routes = computed(() => {
  const _routes = filterRouters(router.getRoutes());

  return generateMenus(_routes);
});

const activeMenu = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.el-menu-vertical {
  height: 100%;
  border-right: solid 1px $menuBg;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: $sideBarWidth;
  height: 100%;
}
</style>