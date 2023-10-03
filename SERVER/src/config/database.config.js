const Sequelize = require("sequelize");

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_DIALECT = process.env.DATABASE_DIALECT;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    port: DATABASE_PORT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối database thành công");
  })
  .catch((error) => {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
  });

sequelize.sync();

module.exports = sequelize;
