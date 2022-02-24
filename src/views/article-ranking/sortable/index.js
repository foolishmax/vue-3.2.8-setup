import { ref } from "vue";
import Sortable from "sortablejs";
import { articleSort } from "@/api/article";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

export const tableRef = ref(null);

export const initSortable = (tableData, callback) => {
  const el = tableRef.value.$el.querySelectorAll(
    ".el-table__body-wrapper > table > tbody"
  )[0];

  Sortable.create(el, {
    ghostClass: "sortable-ghost",
    async onEnd(event) {
      const { newIndex, oldIndex } = event;

      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking,
      });

      ElMessage.success({
        message: i18n.global.t("msg.article.sortSuccess"),
        type: "success",
      });

      tableData.value = [];
      callback?.();
    },
  });
};
