<template>
  <div class="upload-excel">
    <div class="upload-excel-btn">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>

    <input
      type="file"
      ref="fileInputRef"
      accept=".xlsx, .xls"
      class="upload-excel-input"
      @change="onFileInputChange"
    />

    <div
      class="upload-excel-drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { read, writeFile, utils } from "xlsx";
import { getHeaderRow, isExcel } from "./utils";
import { ElMessage } from "element-plus";

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function,
});

const fileInputRef = ref(null);
const loading = ref(false);

const handleUpload = () => {
  fileInputRef.value.click();
};

const readerData = (files) => {
  loading.value = true;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(files);

    reader.onload = (e) => {
      // 1.获取数据
      const data = e.target.result;
      // 2.通过xlsx进行数据解析
      const workbook = read(data, { type: "array" });
      // 3.获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0];
      // 4.获取第一张表格数据
      const worksheet = workbook.Sheets[firstSheetName];
      // 5.解析数据表头
      const header = getHeaderRow(worksheet);
      // 6.解析数据体
      const results = utils.sheet_to_json(worksheet);
      // 7. 传入解析之后的数据
      props.onSuccess?.({ header, results });
      // 8. loading 处理
      loading.value = false;
      // 9. 异步完成
      resolve();
    };
  });
};

const upload = (files) => {
  const { beforeUpload } = props;

  fileInputRef.value.value = null;

  if (!beforeUpload || beforeUpload(files)) {
    readerData(files);
  }
};

const onFileInputChange = (e) => {
  const files = e.target.files[0];

  if (!files) return;

  upload(files);
};

const handleDrop = (e) => {
  if (loading.value) return;

  const files = e.dataTransfer.files;

  if (files.length !== 1) {
    return ElMessage.error("必须要有一个文件");
  }
  const rawFile = files[0];

  if (!isExcel(rawFile)) {
    return ElMessage.error("文件必须是.xlsx,.xls,.csv格式");
  }

  upload(rawFile);
};

const handleDragover = (e) => {
  e.dataTransfer.dropEffect = "copy";
};
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  &-input {
    display: none;
  }

  &-btn,
  &-drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  &-drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;

    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>