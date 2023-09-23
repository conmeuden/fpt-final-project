const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Import sequelize instance

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
