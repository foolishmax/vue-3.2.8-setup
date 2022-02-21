<template>
  <div
    class="pan-container"
    :style="{ zIndex: zIndex, height: height, width: width }"
  >
    <div class="pan-info">
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="pan-thumb" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  image: {
    type: String,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  width: {
    type: String,
    default: "150px",
  },
  height: {
    type: String,
    default: "150px",
  },
});
</script>

<style lang="scss" scoped>
.pan-container {
  position: relative;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    .pan-thumb {
      transform: rotate(-110deg);
    }
  }

  .pan-thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
    background-size: cover;
    overflow: hidden;
  }

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    & > div {
      padding: 20px;
      text-align: center;
    }
  }
}
</style>