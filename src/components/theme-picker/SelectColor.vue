<template>
  <el-dialog
    title="提示"
    :model-value="modelValue"
    @close="onClosedChange"
    width="22%"
  >
    <div class="center">
      <p>{{ $t("msg.theme.themeColorChange") }}</p>
      <el-color-picker
        v-model="themeColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span>
        <el-button @click="onClosedChange">
          {{ $t("msg.universal.cancel") }}
        </el-button>
        <el-button type="primary" @click="onOk">
          {{ $t("msg.universal.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useStore } from "vuex";
import { generateNewStyle, writeNewStyle } from "@/utils/theme.js";

defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const store = useStore();

// 预定义色值
const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
];
const themeColor = ref(store.getters.themeColor);

const onClosedChange = () => {
  emits("update:modelValue", false);
};

const onOk = async () => {
  const newStyles = await generateNewStyle(themeColor.value);

  writeNewStyle(newStyles);

  store.commit("theme/setThemeColor", themeColor.value);

  onClosedChange();
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}
</style>