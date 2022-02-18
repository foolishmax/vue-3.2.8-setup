<template>
  <div class="nav-header">
    <div class="left-menu">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
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
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                target="_blank"
                href="https://github.com/foolishmax/vue-3.2.8-setup"
              >
                Github
              </a>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Hamburger from "@/components/hamburger";
import Breadcrumb from "@/components/breadcrumb";

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
  padding-right: 20px;
}
</style>