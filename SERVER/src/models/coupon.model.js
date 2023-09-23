const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

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
      type: DataTypes.STRING, // Loại có thể là "date", "percent", hoặc "fixed"
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
