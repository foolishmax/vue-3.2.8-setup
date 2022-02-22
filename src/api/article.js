import request from "@/utils/request";

export const getArticleList = (params) => {
  return request({
    url: "/article/list",
    params,
  });
};

export const deleteArticle = (id) => {
  return request({
    url: `/article/delete/${id}`,
  });
};
