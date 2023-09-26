/**
 * @swagger
 * tags:
 *   - name: ADMIN LOGIN
 *     description: API related to admin
 */

const User = require("../../models/user.model");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");

const ROLE = "ADMIN";

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Đăng nhập vào trang admin
 *     description: Đăng nhập vào trang admin với tên người dùng và mật khẩu.
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của người dùng.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của người dùng.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công.
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               description: Thông tin người dùng.
 *             access_token:
 *               type: string
 *               description: Mã token truy cập.
 *       401:
 *         description: Lỗi xác thực, mật khẩu không chính xác.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Lỗi không tìm thấy người dùng.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Lỗi server nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: ROLE } });

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

    return res.json({ user, access_token });
  } catch (error) {
    log(`Lỗi đăng nhập trang admin: ${error}`);
    res.status(500).json({ error: "Lỗi xử lý" });
  }
};

module.exports = {
  login,
};
