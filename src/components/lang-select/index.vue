<template>
  <el-dropdown trigger="click" @command="onLanguageChange">
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language" id="guide-lang" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

defineProps({
  effect: {
    type: String,
    default: "dark",
    validator: function (value) {
      return ["dark", "light"].includes(value);
    },
  },
});

const store = useStore();
const i18n = useI18n();

const language = computed(() => store.getters.language);

const onLanguageChange = (lang) => {
  i18n.locale.value = lang;
  store.commit("app/setLanguage", lang);

  ElMessage.success(i18n.t("msg.toast.switchLangSuccess"));
};
</script>

<style lang="scss" scoped>
</style>