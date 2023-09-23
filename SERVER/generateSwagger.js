const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/doc/swagger.json"; // Đường dẫn tới tệp JSON đầu ra
const endpointsFiles = ["./src/routes/*.js"]; // Đường dẫn tới tệp route của bạn

swaggerAutogen(outputFile, endpointsFiles);
