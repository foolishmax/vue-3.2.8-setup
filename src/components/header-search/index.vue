<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      icon="search"
      class="search-icon"
      @click.stop="onShowChange"
    ></svg-icon>
    <el-select
      ref="searchRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="onSearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Fuse from "fuse.js";
import { generateRoutes } from "./formatFuseData.js";
import { filterRouters } from "@/utils/route";
import { watchSwitchLang } from "@/utils/i18n.js";

const isShow = ref(false);
const searchRef = ref(null);
const searchOptions = ref([]);
const search = ref("");

const router = useRouter();

const onShowChange = () => {
  isShow.value = !isShow.value;
  searchRef.value.focus();
};

const onSearch = (value) => {
  if (value) {
    searchOptions.value = fuse.search(value);
  } else {
    searchOptions.value = [];
  }
};

const onClose = () => {
  searchRef.value.blur();
  isShow.value = false;
  searchOptions.value = [];
};

const onSelectChange = (value) => {
  router.push(value.path);

  onClose();
};

// 检索数据源
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());

  console.log(generateRoutes(filterRoutes));
  return generateRoutes(filterRoutes);
});

let fuse;
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    threshold: 0.4,
    minMatchCharLength: 1,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
};
initFuse(searchPool.value);

watch(isShow, (value) => {
  if (value) {
    document.body.addEventListener("click", onClose);
  } else {
    document.body.removeEventListener("click", onClose);
  }
});

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes());

    return generateRoutes(filterRoutes);
  });

  initFuse(searchPool.value);
});
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;

  .search-icon {
    padding: 3px;
    font-size: 18px;
    cursor: pointer;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>