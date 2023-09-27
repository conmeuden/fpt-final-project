/**
 * @swagger
 * definitions:
 *   Blog:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của bài viết.
 *       title:
 *         type: string
 *         description: Tiêu đề của bài viết.
 *       thumbnail:
 *         type: string
 *         description: URL hình ảnh đại diện cho bài viết.
 *       keywords:
 *         type: string
 *         description: Các từ khóa liên quan đến bài viết.
 *       description:
 *         type: string
 *         description: Mô tả ngắn gọn về bài viết.
 *       slug:
 *         type: string
 *         description: Slug của bài viết.
 *       content:
 *         type: string
 *         description: Nội dung chi tiết của bài viết.
 *       status:
 *         type: integer
 *         description: Trạng thái của bài viết (1 - Đã xuất bản, 0 - Chưa xuất bản).
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Ngày và giờ tạo bài viết.
 */
const Sequelize = require("sequelize");
const sequelize = require("../config/database.config");

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    thumbnail: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    keywords: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(600),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "blogs", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Blog;
