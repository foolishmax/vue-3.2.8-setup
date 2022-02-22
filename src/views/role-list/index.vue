<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border>
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionChange(row)"
            v-permission="['distributePermission']"
          >
            {{ $t("msg.role.assignPermissions") }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import { ref } from "vue";
import DistributePermission from "./components/DistributePermission.vue";

const allRoles = ref([]);
const selectRoleId = ref("");
const distributePermissionVisible = ref(false);

const getRoleList = async () => {
  allRoles.value = await roleList();

  console.log(allRoles.value);
};

getRoleList();

const onDistributePermissionChange = (row) => {
  selectRoleId.value = row.id;
  distributePermissionVisible.value = true;
};
watchSwitchLang(getRoleList);
</script>

<style lang="scss" scoped></style>
