<template>
  <el-sub-menu v-if="route.children.length" :index="route.path">
    <template #title>
      <item :title="route.meta.title" :icon="route.meta.icon"></item>
    </template>
    <menu-item v-for="item in route.children" :key="item.path" :route="item">
    </menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <item :title="route.meta.title" :icon="route.meta.icon"></item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";
import item from "./Item.vue";

const props = defineProps({
  route: {
    type: Object,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>