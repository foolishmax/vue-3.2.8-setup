import request from "@/utils/request";

export const getUserManageList = (params) => {
  return request({
    url: "/user-manage/list",
    params,
  });
};
