<template>
  <div class="user-manage-container">
    <el-card>
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t("msg.excel.importExcel") }}
        </el-button>
        <el-button type="success" @click="onExportToExcelVisibleChange">
          {{ $t("msg.excel.exportExcel") }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role.length">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t("msg.excel.defaultRole") }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
            >
              {{ $t("msg.excel.show") }}
            </el-button>
            <el-button
              type="info"
              size="small"
              v-permission="['distributeRole']"
              @click="onShowRoleClick(row)"
            >
              {{ $t("msg.excel.showRole") }}
            </el-button>
            <el-button
              type="danger"
              v-permission="['removeUser']"
              size="small"
              @click="onRemoveClick(row)"
            >
              {{ $t("msg.excel.remove") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>

    <role-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></role-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from "vue";
import { getUserManageList, deleteUser } from "@/api/user-manage";
import { watchSwitchLang } from "@/utils/i18n";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import ExportToExcel from "./components/ExportToExcel.vue";
import RoleDialog from "./components/Role.vue";

const router = useRouter();
const i18n = useI18n();
const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(2);
const exportToExcelVisible = ref(false);
const roleDialogVisible = ref(false);
const selectUserId = ref("");

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value,
  });

  tableData.value = result.list;
  total.value = result.total;
};

getListData();

const onSizeChange = (currentSize) => {
  size.value = currentSize;
  getListData();
};

const onCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

const onImportExcelClick = () => {
  router.push("/user/import");
};

const onShowClick = (id) => {
  router.push(`/user/info/${id}`);
};

const onShowRoleClick = (row) => {
  selectUserId.value = row._id;
  roleDialogVisible.value = true;
};

const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t("msg.excel.dialogTitle1") +
      row.username +
      i18n.t("msg.excel.dialogTitle2"),
    {
      type: "warning",
    }
  ).then(async () => {
    await deleteUser(row._id);

    ElMessage.success(i18n.t(i18n.t("msg.excel.removeSuccess")));

    getListData();
  });
};

const onExportToExcelVisibleChange = () => {
  exportToExcelVisible.value = true;
};

watch(roleDialogVisible, (value) => {
  if (!value) selectUserId.value = "";
});

watchSwitchLang(getListData);
onActivated(getListData);
</script>

<style lang="scss" scoped>
.user-manage-container {
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
