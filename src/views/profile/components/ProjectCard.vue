<template>
  <el-card class="project-card">
    <div class="project-card-header">
      <span>{{ $t("msg.profile.introduce") }}</span>
    </div>
    <div class="project-card-pan-thumb">
      <pan-thumb
        :image="$store.getters.userInfo.avatar"
        :width="'100px'"
        :height="'100px'"
        :hoverable="false"
      >
        <div>hello</div>
        {{ $store.getters.userInfo.title }}
      </pan-thumb>
      <div>
        <div>{{ $store.getters.userInfo.username }}</div>
        <div>{{ $store.getters.userInfo.title }}</div>
      </div>
    </div>
    <div class="project-card-intro">
      <div>
        <svg-icon class="project-card-intro-icon" icon="introduce"></svg-icon>
        <span>{{ $t("msg.profile.projectIntroduction") }}</span>
      </div>
      <div>
        {{ $t("msg.profile.muted") }}
      </div>
    </div>
    <div class="project-card-feature">
      <div>
        <svg-icon icon="reward"></svg-icon>
        <span>{{ $t("msg.profile.projectFunction") }}</span>
      </div>
      <div>
        <div
          class="project-card-feature-item"
          v-for="item in features"
          :key="item.id"
        >
          <div>{{ item.title }}</div>
          <el-progress
            :percentage="item.percentage"
            status="success"
          ></el-progress>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { PanThumb } from "@/components";
import { defineProps } from "vue";

defineProps({
  features: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;

  &-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }

  &-pan-thumb {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    & > .pan-container {
      margin-bottom: 10px;
    }

    & > div:last-of-type {
      & > div {
        line-height: 28px;
      }
    }
  }

  &-intro,
  &-feature {
    color: #606266;

    &-icon {
      padding-right: 4px;
      font-size: 18px;
    }

    & > div:first-of-type {
      padding-bottom: 6px;
    }
  }

  &-intro {
    & > div:last-of-type {
      font-size: 14px;
      color: #777;
    }
  }

  &-feature {
    &-item {
      margin-top: 10px;

      & > div:first-of-type {
        font-size: 12px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>