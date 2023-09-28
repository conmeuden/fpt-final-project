/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của danh mục.
 *       name:
 *         type: string
 *         description: Tên danh mục.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng mà danh mục thuộc về.
 *       status:
 *         type: integer
 *         description: Trạng thái của danh mục (ví dụ: hoạt động, tạm ngừng).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'categories'
const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "categories", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Category;
