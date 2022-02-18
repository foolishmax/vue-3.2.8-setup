<template>
  <div
    class="app-layout"
    :class="[$store.getters.sidebarOpened || 'hideSidebar']"
  >
    <div class="left-container" :style="{ backgroundColor: variables.menuBg }">
      <side-bar></side-bar>
    </div>
    <div class="main-container">
      <v-header class="header"></v-header>
      <v-main class="main"></v-main>
    </div>
  </div>
</template>

<script setup>
import SideBar from "./components/side-bar/index.vue";
import VHeader from "./components/Header.vue";
import VMain from "./components/Main.vue";
import variables from "@/styles/variables.scss";
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-layout {
  display: flex;
  @include clearfix;
  height: 100%;
  width: 100%;
}

.main-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100%;
  transition: margin-left #{$sideBarDuration};
  position: relative;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  height: 50px;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration} ease-in-out;
  z-index: 1;
}

.hideSidebar .header {
  width: calc(100% - #{$hideSideBarWidth});
  transition: width #{$sideBarDuration} ease-in-out;
}

.main {
  flex: 1;
}
</style>