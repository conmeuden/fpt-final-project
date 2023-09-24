// DÙNG CHO NGƯỜI BÁN HÀNG ĐĂNG NHẬP VÀO SHOP MANAGEMENT

const User = require("../../models/user.model");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: "SALER" } });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    // Xác minh mật khẩu
    const isPasswordValid = await bcryptService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // Mật khẩu đúng, tạo mã token và trả về
    const access_token = await jwtService.generateToken(user);

    return res.json({ access_token });
  } catch (error) {
    log(`Lỗi đăng nhập trang shop: ${error}`);
    res.status(500).json({ error: "Lỗi xử lý" });
  }
};

module.exports = {
  login,
};
