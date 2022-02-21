<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="onClose"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">
          {{ $t("msg.excel.close") }}
        </el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
          {{ $t("msg.excel.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useI18n } from "vue-i18n";
import { getUserManageAllList } from "@/api/user-manage";
import { watchSwitchLang } from "@/utils/i18n";
import { USER_RELATIONS } from "./constants";
import { dateFormat } from "@/utils/date";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update: modelValue"]);
const loading = ref(false);
const i18n = useI18n();
const excelName = ref(i18n.t("msg.excel.defaultName"));

const onClose = () => {
  loading.value = false;
  emits("update:modelValue", false);
};

const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 时间特殊处理
      if (headers[key] === "openTime") {
        return dateFormat(item[headers[key]]);
      }
      // 角色特殊处理
      if (headers[key] === "role") {
        const roles = item[headers[key]];

        return JSON.stringify(roles.map((role) => role.title));
      }
      return item[headers[key]];
    });
  });
};

const onConfirm = async () => {
  loading.value = true;
  const allUser = (await getUserManageAllList()).list;
  // 导入工具包
  const excel = await import("@/utils/export2Excel");
  const data = formatJson(USER_RELATIONS, allUser);
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: "xlsx",
  });
  onClose();
};

watchSwitchLang(() => {
  excelName.value = i18n.t("msg.excel.defaultName");
});
</script>

<style lang="scss" scoped>
</style>