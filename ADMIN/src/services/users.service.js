import AxiosService from "./axios.service";

const UserService = {
  getAllUsers: async ({ page, limit, keyword, role, status }) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
      role,
      status,
    });

    const res = await AxiosService.get({ url: "api/users", params });
    return res.data;
  },

  getUserById: async (userId) => {
    const res = await AxiosService.get({ url: `api/users/${userId}` });
    return res.data;
  },

  createUser: async (user) => {
    const res = await AxiosService.post({ url: "api/users", data: user });
    return res.data;
  },

  updateUser: async ({ id, user }) => {
    const res = await AxiosService.put({
      url: `api/users/${id}`,
      data: user,
    });
    return res.data;
  },

  removeUser: async (id) => {
    const res = await AxiosService.delete({
      url: `api/users/${id}`,
    });
    return res.data;
  },
};

export default UserService;
