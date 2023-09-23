const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

// Định nghĩa model cho bảng 'users'
const User = sequelize.define(
  "user",
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
    full_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = User;
