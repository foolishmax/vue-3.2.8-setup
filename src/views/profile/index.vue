<template>
  <div class="personal-center-container">
    <el-row>
      <el-col :span="6">
        <project-card :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectCard from "./components/ProjectCard.vue";
import Author from "./components/Author.vue";
import Chapter from "./components/Chapter.vue";
import Feature from "./components/Feature.vue";
import { getFeature } from "@/api/user";
import { watchSwitchLang } from "@/utils/i18n";

const activeTab = ref("feature");
const featureData = ref([]);

const getFeatureData = async () => {
  featureData.value = await getFeature();
};

getFeatureData();

watchSwitchLang(getFeatureData);
</script>

<style lang="scss" scoped></style>
