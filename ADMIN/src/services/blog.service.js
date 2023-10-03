import AxiosService from "./axios.service";

const BlogService = {
  getAllBlogs: async ({ page, limit, keyword}) => {
    const params = new URLSearchParams({
      page: page || 1,
      limit: limit || 10,
      keyword: keyword || "",
    });

    const res = await AxiosService.get({ url: "api/blogs", params });
    return res.data;
  },


  getBlogById: async (blogId) => {
    const res = await AxiosService.get({ url: `api/blogs/id/${blogId}` });
    return res.data;
  },

  createBlog: async (blog) => {
    const res = await AxiosService.post({ url: "api/blogs", data: blog });
    return res.data;
  },

  updateBlog: async ({ id, blog }) => {
    const res = await AxiosService.put({
      url: `api/blogs/${id}`,
      data: blog,
    });
    return res.data;
  },

  removeBlog: async (id) => {
    const res = await AxiosService.delete({
      url: `api/blogs/${id}`,
    });
    return res.data;
  },
};



export default BlogService;

