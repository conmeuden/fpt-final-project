const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'products'
const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    industry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    base_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    import_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    total_like: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    properties: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    variant_list: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Product;
