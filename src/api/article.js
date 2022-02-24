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

export const articleSort = (data) => {
  return request({
    url: "/article/sort",
    method: "POST",
    data,
  });
};

export const createArticle = (data) => {
  return request({
    url: "/article/create",
    method: "POST",
    data,
  });
};

export const articleEdit = (data) => {
  return request({
    url: "/article/edit",
    method: "POST",
    data,
  });
};

export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`,
  });
};
