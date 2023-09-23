const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

// Định nghĩa model cho bảng 'packages'
const Package = sequelize.define(
  "package",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "packages", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Package;
