<template>
  <div class="logo-container">
    <el-avatar
      shape="circle"
      src="https://raw.githubusercontent.com/foolishmax/foolishmax.github.io/master/images/assets_img/lbs.jpeg"
      :size="logoHeight"
    >
    </el-avatar>
    <h1 class="logo-title" v-if="$store.getters.sidebarOpened">foolishmax</h1>
  </div>
  <left-menu></left-menu>
</template>

<script setup>
import LeftMenu from "./LeftMenu.vue";

const logoHeight = 44;
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>