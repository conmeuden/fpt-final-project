/**
 * @swagger
 * definitions:
 *   Package:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của gói dịch vụ.
 *       name:
 *         type: string
 *         description: Tên của gói dịch vụ.
 *       price:
 *         type: number
 *         format: double
 *         description: Giá của gói dịch vụ.
 *       date:
 *         type: integer
 *         description: Số ngày sử dụng của gói dịch vụ.
 *       status:
 *         type: integer
 *         description: Trạng thái của gói dịch vụ (ví dụ: hoạt động, ngừng hoạt động).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'packages'
const Package = sequelize.define(
  "package",
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
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "packages", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Package;
