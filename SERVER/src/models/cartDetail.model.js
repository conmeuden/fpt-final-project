/**
 * @swagger
 * definitions:
 *   CartDetail:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của chi tiết giỏ hàng.
 *       cart_id:
 *         type: integer
 *         description: ID của giỏ hàng mà chi tiết giỏ hàng thuộc về.
 *       product_id:
 *         type: integer
 *         description: ID của sản phẩm trong chi tiết giỏ hàng.
 *       product_variant_code:
 *         type: string
 *         description: Mã biến thể của sản phẩm trong chi tiết giỏ hàng.
 *       price:
 *         type: number
 *         description: Giá của sản phẩm trong chi tiết giỏ hàng.
 *       quantity:
 *         type: integer
 *         description: Số lượng sản phẩm trong chi tiết giỏ hàng.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

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
