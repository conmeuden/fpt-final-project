/**
 * @swagger
 * definitions:
 *   Rating:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của xếp hạng.
 *       product_id:
 *         type: integer
 *         description: ID của sản phẩm được xếp hạng.
 *       star:
 *         type: integer
 *         description: Số sao đánh giá (ví dụ: 1-5).
 *       comment:
 *         type: string
 *         description: Bình luận đánh giá.
 *       user_id:
 *         type: integer
 *         description: ID của người dùng tạo xếp hạng.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Ngày tạo xếp hạng.
 *       status:
 *         type: integer
 *         description: Trạng thái của xếp hạng (ví dụ: hoạt động, ngừng hoạt động).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'rating'
const Rating = sequelize.define(
  "rating",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "rating", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Rating;
