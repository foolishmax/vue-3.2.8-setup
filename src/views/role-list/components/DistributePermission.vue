<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="onClose"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      node-key="id"
      check-strictly
      default-expand-all
      :props="{ children: 'children', label: 'permissionName' }"
    >
    </el-tree>
    <template #footer>
      <span>
        <el-button @click="onClose">
          {{ $t("msg.universal.cancel") }}
        </el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t("msg.universal.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { permissionList } from "@/api/permission";
import { watchSwitchLang } from "@/utils/i18n";
import { rolePermission, distributePermission } from "@/api/role";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});
const i18n = useI18n();
const allPermission = ref([]);
const treeRef = ref(null);

const getPermissionList = async () => {
  allPermission.value = await permissionList();
};

const onClose = () => {
  emits("update:modelValue", false);
};

const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys(),
  });
  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));

  onClose();
};

const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId);

  treeRef.value.setCheckedKeys(checkedKeys);
};

watch(
  () => props.roleId,
  (value) => {
    if (value) {
      getRolePermission();
    }
  }
);

getPermissionList();
watchSwitchLang(getPermissionList);
</script>

<style lang="scss" scoped>
</style>