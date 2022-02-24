<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxLength="20"
        clearable
      ></el-input>
    </el-card>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
        <markdown
          :title="title"
          :detail="detail"
          @onSuccess="onSuccess"
        ></markdown>
      </el-tab-pane>
      <el-tab-pane :label="$t('msg.article.richText')" name="editor">
        <editor :title="title" :detail="detail" @onSuccess="onSuccess"></editor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import Markdown from "./components/Markdown.vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/article";

const activeTab = ref("markdown");
const title = ref("");
const detail = ref({});
const route = useRoute();
const articleId = route.params.id;

const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId);

  title.value = detail.value.title;
};

const onSuccess = () => {
  title.value = "";
};

if (articleId) {
  getArticleDetail();
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
