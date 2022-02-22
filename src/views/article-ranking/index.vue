<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <span>{{ $t("msg.article.dynamicTitle") }}</span>
      <el-checkbox-group v-model="selectedKeys">
        <el-checkbox
          v-for="(item, index) in columns"
          :label="item.label"
          :key="index"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t("msg.article.show")
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t("msg.article.remove")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { columns, selectedKeys, tableColumns } from "./dynamic";
import { getArticleList, deleteArticle } from "@/api/article";
import { watchSwitchLang } from "@/utils/i18n";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const router = useRouter();
const i18n = useI18n();
const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value,
  });

  tableData.value = result.list;
  total.value = result.total;
};

const onShowClick = (row) => {
  router.push(`/article/${row._id}`);
};

const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t("msg.article.dialogTitle1") +
      row.title +
      i18n.t("msg.article.dialogTitle2"),
    {
      type: "warning",
    }
  ).then(async () => {
    await deleteArticle(row._id);
    ElMessage.success(i18n.t("msg.article.removeSuccess"));
    // 重新渲染数据
    getListData();
  });
};

const handleSizeChange = (currentSize) => {
  size.value = currentSize;
  getListData();
};

const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

// 监听语言切换
watchSwitchLang(getListData);
// 处理数据不重新加载的问题
onActivated(getListData);
</script>


<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
