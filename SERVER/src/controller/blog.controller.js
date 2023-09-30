/**
 * @swagger
 * tags:
 *   - name: Blogs restful
 *     description: API related to Blogs
 */

const { Blog } = require("../models/index");
const { log } = require("../services/discord.logger");
const { convertToSlug } = require("../utils/helper");
const { Op } = require("sequelize");

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Lấy danh sách các bài viết với phân trang và tìm kiếm.
 *     description: Lấy danh sách tất cả các bài viết với khả năng phân trang và tìm kiếm theo từ khóa.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Số trang cần lấy (mặc định là 1).
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Số lượng bài viết trên mỗi trang (mặc định là 10).
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: Từ khóa tìm kiếm trong tiêu đề bài viết.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Danh sách các bài viết được tìm thấy.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             blogs:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Blog'
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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
      attributes: {
        exclude: ["content", "slug"], // Exclude the 'content' field
      },
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

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một bài viết theo ID.
 *     description: Lấy thông tin chi tiết của một bài viết dựa trên ID bài viết.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của bài viết cần lấy thông tin.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của bài viết.
 *         schema:
 *           $ref: '#/definitions/Blog'
 *       404:
 *         description: Lỗi, bài viết không được tìm thấy.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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

/**
 * @swagger
 * /api/blogs/slug/{slug}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một bài viết theo slug.
 *     description: Lấy thông tin chi tiết của một bài viết dựa trên slug của bài viết.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug của bài viết cần lấy thông tin.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của bài viết.
 *         schema:
 *           $ref: '#/definitions/Blog'
 *       404:
 *         description: Lỗi, bài viết không được tìm thấy.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Tạo bài viết mới.
 *     description: Tạo một bài viết mới với thông tin cần thiết.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Tiêu đề của bài viết mới.
 *         required: true
 *         type: string
 *       - name: thumbnail
 *         in: formData
 *         description: URL hình ảnh đại diện cho bài viết.
 *         required: true
 *         type: string
 *       - name: keywords
 *         in: formData
 *         description: Các từ khóa liên quan đến bài viết.
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Mô tả ngắn gọn về bài viết.
 *         required: true
 *         type: string
 *       - name: content
 *         in: formData
 *         description: Nội dung chi tiết của bài viết.
 *         required: true
 *         type: string
 *       - name: status
 *         in: formData
 *         description: Trạng thái của bài viết (1 - Đã xuất bản, 0 - Chưa xuất bản).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Bài viết mới đã được tạo thành công.
 *         schema:
 *           $ref: '#/definitions/Blog'
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Cập nhật thông tin bài viết theo ID.
 *     description: Cập nhật thông tin của một bài viết dựa trên ID của bài viết.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của bài viết cần cập nhật thông tin.
 *         required: true
 *         type: integer
 *       - name: title
 *         in: formData
 *         description: Tiêu đề của bài viết cần cập nhật.
 *         required: true
 *         type: string
 *       - name: thumbnail
 *         in: formData
 *         description: URL hình ảnh đại diện cho bài viết.
 *         required: true
 *         type: string
 *       - name: keywords
 *         in: formData
 *         description: Các từ khóa liên quan đến bài viết cần cập nhật.
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Mô tả ngắn gọn về bài viết cần cập nhật.
 *         required: true
 *         type: string
 *       - name: content
 *         in: formData
 *         description: Nội dung chi tiết của bài viết cần cập nhật.
 *         required: true
 *         type: string
 *       - name: status
 *         in: formData
 *         description: Trạng thái của bài viết cần cập nhật (1 - Đã xuất bản, 0 - Chưa xuất bản).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Thông tin bài viết đã được cập nhật thành công.
 *         schema:
 *           $ref: '#/definitions/Blog'
 *       404:
 *         description: Lỗi, bài viết không được tìm thấy.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Xóa bài viết theo ID.
 *     description: Đánh dấu một bài viết đã bị xóa bằng cách cập nhật trạng thái thành "0".
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của bài viết cần xóa.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Bài viết đã được đánh dấu là đã xóa thành công.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Lỗi, bài viết không được tìm thấy.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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
