<template>
  <el-card>
    <el-table
      :data="allPermission"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      >
      <el-table-column
        prop="permissionName"
        :label="$t('msg.permission.name')"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="permissionMark"
        :label="$t('msg.permission.mark')"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="permissionDesc" :label="$t('msg.permission.desc')">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { permissionList } from "@/api/permission";
import { watchSwitchLang } from "@/utils/i18n";
import { ref } from "vue";

const allPermission = ref([]);
const getPermissionList = async () => {
  allPermission.value = await permissionList();
  console.log(allPermission.value);
};

getPermissionList();
watchSwitchLang(getPermissionList);
</script>

<style lang="scss" scoped></style>
