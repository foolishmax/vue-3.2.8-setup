import getColumns from "./columns";
import { ref, watch } from "vue";

export const columns = ref(getColumns());

export const selectedKeys = ref([]);

const initSelectedKey = () => {
  selectedKeys.value = columns.value.map((item) => item.label);
};

initSelectedKey();

export const tableColumns = ref([]);

watch(
  selectedKeys,
  (value) => {
    tableColumns.value = [];

    const filterColumns = columns.value.filter((item) =>
      value.includes(item.label)
    );

    tableColumns.value.push(...filterColumns);
  },
  {
    immediate: true,
  }
);
