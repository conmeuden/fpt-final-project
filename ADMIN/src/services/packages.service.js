import AxiosService from "./axios.service";

const PackageService = {
  getAllPackages: async ({ page, limit, keyword }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || ""
    });

    const res = await AxiosService.get({ url: "api/packages", params });
    return res.data;
  },

  getPackageById: async (packageId) => {
    const res = await AxiosService.get({ url: `api/packages/${packageId}` });
    return res.data;
  },

  createPackage: async (pkg) => {
    const res = await AxiosService.post({ url: "api/packages", data: pkg });
    return res.data;
  },

  updatePackage: async ({ id, pkg }) => {
    const res = await AxiosService.put({
      url: `api/packages/${id}`,
      data: pkg,
    });
    return res.data;
  },

  removePackage: async (id) => {
    const res = await AxiosService.delete({
      url: `api/packages/${id}`,
    });
    return res.data;
  },
};

export default PackageService;
