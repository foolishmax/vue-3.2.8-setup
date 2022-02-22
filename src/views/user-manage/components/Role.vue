<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="onClose"
  >
    <el-checkbox-group v-model="currentRoles">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { roleList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import { userRoles, updateRole } from "@/api/user-manage";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue", "updateRole"]);

const allRoleList = ref([]);
const currentRoles = ref([]);
const i18n = useI18n();

const onConfirm = async () => {
  // 处理数据结构
  const roles = currentRoles.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title);
  });

  await updateRole(props.userId, roles);

  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));
  onClose();
  // 角色更新成功
  emits("updateRole");
};

/**
 * 关闭
 */
const onClose = () => {
  emits("update:modelValue", false);
};

const getListData = async () => {
  allRoleList.value = await roleList();
};

const getUserRoles = async () => {
  const res = await userRoles(props.userId);

  currentRoles.value = res.role.map((item) => item.title);
};

watch(
  () => props.userId,
  (value) => {
    if (value) getUserRoles();
  }
);

getListData();
watchSwitchLang(getListData);
</script>

<style lang="scss" scoped>
</style>