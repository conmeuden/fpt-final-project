const { Blog } = require("../models/index");
const { log } = require("../services/discord.logger");
const { convertToSlug } = require("../utils/helper");

// Tìm tất cả các bài viết
const findAll = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs);
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

    const newSlug = convertToSlug(title);

    const [updatedBlogs, updatedRowsCount] = await Blog.update(
      {
        title,
        thumbnail,
        keywords,
        description,
        slug: newSlug,
        content,
        status,
      },
      {
        where: { id: Number(id) },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.json(updatedBlogs[0]);
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
    const deletedRowCount = await Blog.destroy({ where: { id } });
    if (deletedRowCount === 0) {
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
