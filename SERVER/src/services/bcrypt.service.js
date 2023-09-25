const bcrypt = require("bcrypt");
const saltRounds = 10; // Số lần lặp mã hóa, càng cao càng an toàn nhưng càng tốn thời gian

// Hàm để mã hóa mật khẩu
async function hash(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
}

// Hàm để so sánh mật khẩu đã mã hóa với mật khẩu gốc
async function compare(plainPassword, hashedPassword) {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hash,
  compare,
};
