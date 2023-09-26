/**
 * @swagger
 * definitions:
 *   Shop:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của cửa hàng.
 *       name:
 *         type: string
 *         description: Tên cửa hàng.
 *       user_id:
 *         type: integer
 *         description: ID của người dùng sở hữu cửa hàng.
 *       package_id:
 *         type: integer
 *         description: ID của gói dịch vụ của cửa hàng.
 *       logo:
 *         type: string
 *         description: Đường dẫn đến logo của cửa hàng.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Ngày tạo cửa hàng.
 *       description:
 *         type: string
 *         description: Mô tả cửa hàng.
 *       address:
 *         type: string
 *         description: Địa chỉ cửa hàng.
 *       phone_number:
 *         type: string
 *         description: Số điện thoại cửa hàng.
 *       status:
 *         type: integer
 *         description: Trạng thái của cửa hàng (ví dụ: hoạt động, ngừng hoạt động).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'shops'
const Shop = sequelize.define(
  "shop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "shops", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Shop;
