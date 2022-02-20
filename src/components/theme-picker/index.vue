<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <svg-icon
        id="guide-theme"
        icon="change-theme"
        @click.prevent="onVisibleChange"
      ></svg-icon>
    </el-tooltip>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import SelectColor from "./SelectColor.vue";
import { ref } from "vue";

const selectColorVisible = ref(false);

const onVisibleChange = () => {
  selectColorVisible.value = true;
};
</script>

<style lang="scss" scoped>
</style>