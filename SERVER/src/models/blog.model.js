const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    keywords: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(600),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "blogs", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng các trường timestamps
  }
);

module.exports = Blog;
