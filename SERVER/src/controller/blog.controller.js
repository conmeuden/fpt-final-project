const { Blog } = require("../models/index");
const { log } = require("../services/discord.logger");
const { convertToSlug } = require("../utils/helper");
const { Op } = require("sequelize");

// Tìm tất cả các bài viết với phân trang và tìm kiếm
const findAll = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1, // Trang mặc định là 1 nếu không có tham số
      limit: parseInt(limit, 10) || 10, // Giới hạn số bài viết trên mỗi trang, mặc định là 10 nếu không có tham số
    };

    // Điều kiện tìm kiếm
    const whereCondition = {};

    if (keyword) {
      whereCondition.title = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    // Tìm kiếm và phân trang
    const blogs = await Blog.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    log(`Error fetching blogs: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tìm bài viết theo ID
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    log(`Error fetching blog with ID ${id}: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tìm bài viết theo slug
const findBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ where: { slug } });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    log(`Error fetching blog with slug ${slug}: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo bài viết mới
const create = async (req, res) => {
  try {
    const {
      title,
      thumbnail,
      keywords,
      description,
      content,
      status,
    } = req.body;
    const newSlug = convertToSlug(title);
    const blog = await Blog.create({
      title,
      thumbnail,
      keywords,
      description,
      slug: newSlug,
      content,
      status,
      created_at: new Date(),
    });
    return res.json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    log(`Error creating blog: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật bài viết theo ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      thumbnail,
      keywords,
      description,
      content,
      status,
    } = req.body;

    const existingBlog = await Blog.findByPk(id);

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Cập nhật thông tin của blog    const newSlug = convertToSlug(title);

    existingBlog.title = title;
    existingBlog.thumbnail = thumbnail;
    existingBlog.keywords = keywords;
    existingBlog.description = description;
    existingBlog.content = content;
    existingBlog.slug = convertToSlug(title);
    existingBlog.status = status;

    await existingBlog.save();

    return res.json(existingBlog);
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    log(`Error updating blog with ID ${id}: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa bài viết theo ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await Blog.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    log(`Error deleting blog with ID ${id}: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  findBySlug,
  update,
  remove,
};
