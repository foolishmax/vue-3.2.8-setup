<template>
  <el-collapse v-model="activeItem" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, defineProps } from "vue";

defineProps({
  features: {
    type: Array,
    required: true,
  },
});

const activeItem = ref(0);
</script>

<style lang="scss" scoped>
</style>