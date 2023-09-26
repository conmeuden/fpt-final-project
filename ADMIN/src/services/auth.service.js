import AxiosService from "./axios.service";

export const AuthService = {
  login: async (email, password) => {
    const res = await AxiosService.post({
      url: "/api/auth/admin/login",
      data: { email, password },
    });
    console.log(res);
    return res;
  },

  refresh: async () => {
    const res = await AxiosService.post({
      url: "/api/auth/admin/refresh",
      data: { token: localStorage.getItem("access_token") },
    });
    console.log(res);
    return res;
  },
};
