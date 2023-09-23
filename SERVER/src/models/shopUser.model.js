const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

// Định nghĩa model cho bảng 'shop_user'
const ShopUser = sequelize.define(
  "shop_user",
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "shop_user", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = ShopUser;
