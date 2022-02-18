<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbData"
      :key="item.path"
    >
      <span v-if="index !== breadcrumbData.length - 1" class="redirect">{{
        item.meta.title
      }}</span>
      <span v-else class="no-redirect">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const breadcrumbData = ref([]);
const route = useRoute();

const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta.title);
};

watch(
  route,
  () => {
    getBreadcrumbData();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}

.redirect {
  color: #666;
  font-weight: 600;
}
</style>