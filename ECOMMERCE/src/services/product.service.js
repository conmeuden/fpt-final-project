import AxiosService from "./axios.service";

export const ProductService = {
  getAllProducts: async ({
    page,
    limit,
    keyword,
    status,
    min_price,
    max_price,
    category_id,
    barcode,
  }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      status: status || "",
      min_price: min_price || "",
      max_price: max_price || "",
      category_id: category_id || "",
      barcode: barcode || "",
    });
    const res = await AxiosService.get({ url: "api/products", params });
    return res.data;
  },
  addCategory: async (product) => {
    const res = await AxiosService.post({
      url: "api/products",
      data: product,
    });
    return res.data;
  },
  updateCategory: async ({ id, product }) => {
    const res = await AxiosService.put({
      url: `api/products/${id}`,
      data: product,
    });
    return res.data;
  },
  deleteCategory: async (id) => {
    const res = await AxiosService.delete({
      url: `api/products/${id}`,
    });
    return res.data;
  },
};
