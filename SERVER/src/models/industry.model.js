/**
 * @swagger
 * definitions:
 *   Industry:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của ngành công nghiệp.
 *       name:
 *         type: string
 *         description: Tên ngành công nghiệp.
 *       icon:
 *         type: string
 *         description: Đường dẫn đến biểu tượng ngành công nghiệp (icon).
 *       status:
 *         type: integer
 *         description: Trạng thái của ngành công nghiệp (ví dụ: hoạt động, tạm ngừng).
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.config"); // Import sequelize instance

// Định nghĩa model cho bảng 'industries'
const Industry = sequelize.define(
  "industry",
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
    icon: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "industries", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Industry;
