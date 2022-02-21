import request from "@/utils/request";

export const getUserManageList = (params) => {
  return request({
    url: "/user-manage/list",
    params,
  });
};

export const userBatchImport = (data) => {
  return request({
    url: "/user-manage/batch/import",
    method: "POST",
    data,
  });
};
