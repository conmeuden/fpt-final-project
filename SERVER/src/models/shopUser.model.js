/**
 * @swagger
 * definitions:
 *   ShopUser:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của mối quan hệ giữa cửa hàng và người dùng.
 *       shop_id:
 *         type: integer
 *         description: ID của cửa hàng.
 *       user_id:
 *         type: integer
 *         description: ID của người dùng.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

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
