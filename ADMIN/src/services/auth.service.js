/** @format */

import AxiosService from "./axios.service";

export const AuthService = {
  login: async (email, password) => {
    const res = await AxiosService.post({
      url: "api/auth/admin/login",
      data: { email, password },
    });
    return res.data;
  },

  refresh: async () => {
    const res = await AxiosService.post({
      url: "api/auth/admin/refresh",
      data: { token: localStorage.getItem("access_token") },
    });
    return res.data;
  },
};
