const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

// Định nghĩa model cho bảng 'cart_details'
const CartDetail = sequelize.define(
  "cart_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_variant_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cart_details", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = CartDetail;
