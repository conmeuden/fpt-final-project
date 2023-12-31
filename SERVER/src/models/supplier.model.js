/**
 * @swagger
 * definitions:
 *   Supplier:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của nhà cung cấp.
 *       name:
 *         type: string
 *         description: Tên của nhà cung cấp.
 *       address:
 *         type: string
 *         description: Địa chỉ của nhà cung cấp.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng.
 *       phone_number:
 *         type: string
 *         description: Số điện thoại của nhà cung cấp.
 *       debt:
 *         type: number
 *         format: double
 *         description: Số nợ của nhà cung cấp.
 *       status:
 *         type: integer
 *         description: Trạng thái của nhà cung cấp.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'suppliers'
const Supplier = sequelize.define(
  "supplier",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    debt: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "suppliers", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Supplier;
