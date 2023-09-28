/**
 * @swagger
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của đơn hàng.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Thời gian tạo đơn hàng.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng liên quan đến đơn hàng.
 *       user_id:
 *         type: integer
 *         description: ID của người dùng liên quan đến đơn hàng.
 *       total_price:
 *         type: number
 *         format: double
 *         description: Tổng giá trị đơn hàng.
 *       coupon:
 *         type: string
 *         description: Mã giảm giá sử dụng cho đơn hàng.
 *       discount:
 *         type: number
 *         format: double
 *         description: Giảm giá được áp dụng cho đơn hàng.
 *       payment:
 *         type: string
 *         description: Phương thức thanh toán cho đơn hàng.
 *       status:
 *         type: integer
 *         description: Trạng thái của đơn hàng (ví dụ: đã thanh toán, đang xử lý).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'orders'
const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coupon: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Order;
