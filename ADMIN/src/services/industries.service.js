/** @format */

import AxiosService from "./axios.service";

const IndustriesService = {
  async getAll() {
    const res = await AxiosService.get({
      url: "api/industries",
    });
    return res.data;
  },

  async create(industryData) {
    // const formData = new FormData();
    // formData.append("name", industryData.name);
    // formData.append("status", industryData.status);
    // formData.append("icon", industryData.icon);

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

  async update(id, industryData) {
    const res = await AxiosService.put({
      url: `api/industries/${id}`,
      data: industryData,
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
