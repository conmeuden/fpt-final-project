/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của sản phẩm.
 *       name:
 *         type: string
 *         description: Tên của sản phẩm.
 *       images:
 *         type: string
 *         description: Đường dẫn tới hình ảnh của sản phẩm.
 *       industry_id:
 *         type: integer
 *         description: ID của ngành công nghiệp mà sản phẩm thuộc về.
 *       description:
 *         type: string
 *         description: Mô tả của sản phẩm.
 *       keywords:
 *         type: string
 *         description: Các từ khóa liên quan đến sản phẩm.
 *       base_price:
 *         type: number
 *         format: double
 *         description: Giá gốc của sản phẩm.
 *       sale_price:
 *         type: number
 *         format: double
 *         description: Giá bán của sản phẩm.
 *       import_price:
 *         type: number
 *         format: double
 *         description: Giá nhập khẩu của sản phẩm.
 *       total_like:
 *         type: integer
 *         description: Tổng số lượt thích của sản phẩm.
 *       properties:
 *         type: string
 *         description: Thuộc tính của sản phẩm.
 *       variant_list:
 *         type: string
 *         description: Danh sách biến thể của sản phẩm.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Ngày tạo sản phẩm.
 *       stock:
 *         type: integer
 *         description: Số lượng tồn kho của sản phẩm.
 *       category_id:
 *         type: integer
 *         description: ID của danh mục mà sản phẩm thuộc về.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng mà sản phẩm thuộc về.
 *       status:
 *         type: integer
 *         description: Trạng thái của sản phẩm (ví dụ: hoạt động, ngừng hoạt động).
 */
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
      allowNull: false,
    },
    keywords: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    base_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    import_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    total_like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    properties: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    variant_list: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
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
