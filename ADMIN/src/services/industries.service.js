/** @format */

import AxiosService from "./axios.service";

const IndustriesService = {
  getAll: async ({ page, limit, keyword, status }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      status: status || "",
    });

    const res = await AxiosService.get({ url: "api/industries", params });
    return res.data;
  },

  async create(industryData) {
    const res = await AxiosService.post({
      url: `api/industries`,
      data: industryData,
    });
    return res.data;
  },

  async getById(id) {
    const res = await AxiosService.get({
      url: `api/industries/${id}`,
    });
    return res.data;
  },

  updateIndustry: async ({ id, industry }) => {
    const res = await AxiosService.put({
      url: `api/industries/${id}`,
      data: industry,
    });
    return res.data;
  },

  async delete(id) {
    const res = await AxiosService.delete({
      url: `api/industries/${id}`,
    });
    return res.data;
  },
};

export default IndustriesService;
