const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

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
