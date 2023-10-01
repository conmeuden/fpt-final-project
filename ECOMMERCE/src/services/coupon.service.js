import AxiosService from "./axios.service";

const CouponService = {
  getAllCoupons: async ({ page, limit, keyword, status }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      status: status || "",
    });
    const res = await AxiosService.get({ url: "api/coupons", params });
    return res.data;
  },
  getCouponById: async (id) => {
    const res = await AxiosService.get({ url: `api/coupons/id/${id}` });
    return res.data;
  },
  getCouponByCode: async (code) => {
    const res = await AxiosService.get({ url: `api/coupons/${code}` });
    return res.data;
  },
  createCoupon: async (coupon) => {
    const res = await AxiosService.post({ url: "api/coupons", data: coupon });
    return res.data;
  },
  updateCoupon: async ({ id, coupon }) => {
    const res = await AxiosService.put({
      url: `api/coupons/${id}`,
      data: coupon,
    });
    return res.data;
  },
  deleteCoupon: async (id) => {
    await AxiosService.delete({ url: `api/coupons/${id}` });
  },
};

export default CouponService;
