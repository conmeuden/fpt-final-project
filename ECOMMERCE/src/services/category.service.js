import AxiosService from "./axios.service";

export const CategoryService = {
  getAllCategories: async ({ page, limit, keyword, status }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      status: status || "",
    });
    const res = await AxiosService.get({ url: "api/categories", params });
    return res.data;
  },
  addCategory: async (category) => {
    const res = await AxiosService.post({
      url: "api/categories",
      data: category,
    });
    return res.data;
  },
};
