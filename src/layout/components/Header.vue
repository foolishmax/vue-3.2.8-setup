<template>
  <div class="nav-header">
    <div class="left-menu">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
      <header-search class="right-menu-item"></header-search>
      <screen-full class="right-menu-item"></screen-full>
      <theme-picker class="right-menu-item"></theme-picker>
      <lang-select class="right-menu-item"></lang-select>
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            src="https://raw.githubusercontent.com/foolishmax/foolishmax.github.io/master/images/assets_img/lbs.jpeg"
          >
          </el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">{{ $t("msg.navBar.home") }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                target="_blank"
                href="https://github.com/foolishmax/vue-3.2.8-setup"
              >
                Github
              </a>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout"
              >{{ $t("msg.navBar.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {
  Hamburger,
  Breadcrumb,
  LangSelect,
  ThemePicker,
  ScreenFull,
  HeaderSearch,
} from "@/components";

const store = useStore();

const logout = () => store.dispatch("user/logout");
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.right-menu {
  display: flex;
  align-items: center;
  padding-right: 20px;

  :deep(.right-menu-item) {
    padding: 3px;
    margin-right: 10px;
    font-size: 24px;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .svg-icon {
      cursor: pointer;
      outline: none;
    }
  }
}
</style>