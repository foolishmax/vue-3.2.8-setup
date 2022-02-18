<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span
          v-if="index !== breadcrumbData.length - 1"
          class="redirect"
          @click="onBreadcrumbClick(item)"
          >{{ item.meta.title }}</span
        >
        <span v-else class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const breadcrumbData = ref([]);
const hoverColor = ref(store.getters.cssVar.menuBg);

const onBreadcrumbClick = (item) => {
  router.push(item.path);
};

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
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: v-bind(hoverColor);
  }
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>