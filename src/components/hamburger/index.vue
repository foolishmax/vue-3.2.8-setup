<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon
      className="hamburger"
      id="#guide-hamburger"
      :icon="icon"
    ></svg-icon>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const icon = computed(() =>
  store.getters.sidebarOpened ? "hamburger-opened" : "hamburger-closed"
);

const toggleClick = () => {
  store.commit("app/onSidebarOpenedChange");
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  cursor: pointer;

  :deep(.hamburger) {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>