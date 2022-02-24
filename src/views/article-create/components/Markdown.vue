<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t("msg.article.commit") }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { onMounted, defineProps, defineEmits, watch } from "vue";
import { useStore } from "vuex";
import { watchSwitchLang } from "@/utils/i18n";
import { commitArticle, editArticle } from "./commit";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  detail: {
    type: Object,
  },
});
const emits = defineEmits(["onSuccess"]);
const store = useStore();
let mkEditor;
let el;

onMounted(() => {
  el = document.querySelector("#markdown-box");

  initEditor();
});

const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: "500px",
    previewStyle: "vertical",
    language: store.getters.language === "zh" ? "zh-CN" : "en",
  });

  mkEditor.getMarkdown();
};

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML(),
    });
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML(),
    });
  }

  mkEditor.reset();
  emits("onSuccess");
};

watch(
  () => props.detail,
  (value) => {
    if (value?.content) {
      mkEditor.setHTML(value.content);
    }
  },
  {
    immediate: true,
  }
);

watchSwitchLang(() => {
  if (!el) return;

  const htmlStr = mkEditor.getHTML();
  mkEditor.destroy();
  initEditor();
  mkEditor.setHTML(htmlStr);
});
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>