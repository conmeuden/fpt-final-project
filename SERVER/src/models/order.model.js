const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

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
