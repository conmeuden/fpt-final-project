/** @format */

import AxiosService from "./axios.service";

export const AuthService = {
  login: async (email, password) => {
    const res = await AxiosService.post({
      url: "api/auth/shop/login",
      data: { email, password },
    });
    return res.data;
  },

  register: async ({
    full_name,
    email,
    password,
    phone_number,
    address,
    shop_name,
  }) => {
    const res = await AxiosService.post({
      url: "api/auth/shop/register",
      data: {
        full_name,
        email,
        password,
        phone_number,
        address,
        shop_name,
      },
    });
    return res.data;
  },

  refresh: async () => {
    const res = await AxiosService.post({
      url: "api/auth/shop/refresh",
      data: { token: localStorage.getItem("access_token") },
    });
    return res.data;
  },

  googleLogin: async ({ access_token }) => {
    const res = await AxiosService.post({
      url: "api/auth/shop/google",
      data: { access_token },
    });
    return res.data;
  },
};
