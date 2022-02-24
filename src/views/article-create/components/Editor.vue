<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t("msg.article.commit") }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import WEditor from "wangeditor";
import { onMounted, watch } from "vue";
import { useStore } from "vuex";
import { commitArticle, editArticle } from "./commit";
import i18next from "i18next";

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

let editor;
let el;

onMounted(() => {
  el = document.querySelector("#editor-box");
  initEditor();
});

const initEditor = () => {
  editor = new WEditor(el);
  editor.config.zIndex = 1;
  editor.config.showMenuTooltips = true;
  editor.config.menuTooltipPosition = "down";

  editor.config.lang = store.getters.language === "zh" ? "zh-CN" : "en";
  editor.i18next = i18next;

  editor.create();
};

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content);
    }
  },
  {
    immediate: true,
  }
);

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html(),
    });
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html(),
    });
  }

  editor.txt.html("");
  emits("onSuccess");
};
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>