/**
 * @swagger
 * definitions:
 *   Coupon:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của phiếu giảm giá.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng mà phiếu giảm giá áp dụng.
 *       code:
 *         type: string
 *         description: Mã phiếu giảm giá.
 *       type:
 *         type: string
 *         description: Loại phiếu giảm giá (date, percent, fixed).
 *       effect_at:
 *         type: date
 *         description: Ngày bắt đầu áp dụng phiếu giảm giá.
 *       expire_at:
 *         type: date
 *         description: Ngày hết hạn của phiếu giảm giá.
 *       discount_amount:
 *         type: number
 *         description: Số tiền giảm giá hoặc phần trăm giảm giá.
 *       minimum_purchase_amount:
 *         type: integer
 *         description: Số tiền tối thiểu để áp dụng phiếu giảm giá.
 *       max_usage_count:
 *         type: integer
 *         description: Số lượng tối đa có thể sử dụng phiếu giảm giá.
 *       status:
 *         type: integer
 *         description: Trạng thái của phiếu giảm giá (ví dụ: hoạt động, tạm ngừng).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'coupons'
const Coupon = sequelize.define(
  "coupon",
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
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // Loại có thể là "percent", hoặc "fixed"
      allowNull: false,
    },
    effect_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    minimum_purchase_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_usage_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "coupons", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Coupon;
