<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import screenfull from "screenfull";

const isFullScreen = ref(false);

const onToggle = () => {
  screenfull.toggle();
};

const change = () => {
  isFullScreen.value = screenfull.isFullscreen;
};

onMounted(() => {
  screenfull.on("change", change);
});

onUnmounted(() => {
  screenfull.off("change", change);
});
</script>

<style lang="scss" scoped>
</style>