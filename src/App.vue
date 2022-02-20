<template>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";
import { generateNewStyle, writeNewStyle } from "@/utils/theme";

const store = useStore();

generateNewStyle(store.getters.themeColor).then((newStyles) => {
  writeNewStyle(newStyles);
});
</script>

<style>
</style>
