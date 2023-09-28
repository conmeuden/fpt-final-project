/**
 * @swagger
 * definitions:
 *   Cart:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của giỏ hàng.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng mà giỏ hàng thuộc về.
 *       user_id:
 *         type: integer
 *         description: ID của người dùng sở hữu giỏ hàng.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config");

const Cart = sequelize.define(
  "cart",
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
    tableName: "carts", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Cart;
