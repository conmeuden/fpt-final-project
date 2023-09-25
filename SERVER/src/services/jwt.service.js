const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPISES_IN;

function generateToken(dataToSign) {
  const payload = { data: dataToSign };
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.data;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
