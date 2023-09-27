/**
 * @swagger
 * definitions:
 *   SupplyOrder:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của đơn đặt hàng cung cấp.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng.
 *       supplier_id:
 *         type: integer
 *         description: ID của nhà cung cấp.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Thời gian tạo đơn đặt hàng.
 *       total_price:
 *         type: number
 *         format: double
 *         description: Tổng giá trị của đơn đặt hàng.
 *       payment:
 *         type: string
 *         description: Phương thức thanh toán của đơn đặt hàng.
 *       status:
 *         type: integer
 *         description: Trạng thái của đơn đặt hàng.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'supplie_order'
const SupplyOrder = sequelize.define(
  "supply_order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "supplie_order", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = SupplyOrder;
