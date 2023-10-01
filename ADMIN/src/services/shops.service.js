import AxiosService from "./axios.service";

const ShopsService = {
  getAllShops: async ({ page, limit, keyword, status }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      status: status || "",
    });

    const res = await AxiosService.get({ url: "api/shops", params });
    return res.data;
  },

  getShopById: async (id) => {
    const res = await AxiosService.get({
      url: `api/shops/${id}`,
    });
    return res.data;
  },

  createShop: async (shop) => {
    const res = await AxiosService.post({
      url: `api/shops`,
      data: shop,
    });
    return res.data;
  },

  updateShop: async ({ id, shop }) => {
    const res = await AxiosService.put({
      url: `api/shops/${id}`,
      data: shop,
    });
    return res.data;
  },

  removeShop: async (id) => {
    const res = await AxiosService.delete({
      url: `api/shops/${id}`,
    });
    return res.data;
  },
};

export default ShopsService;
