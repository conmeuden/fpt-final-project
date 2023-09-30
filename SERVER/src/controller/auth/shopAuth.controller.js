/**
 * @swagger
 * tags:
 *   - name: Saler auth
 *     description: API related to saler
 */
const { Shop, User, Package } = require("../../models/index");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");

const ROLE = "SALER";
const TRIAL_PACKAGE = "Trial Package";

/**
 * @swagger
 * /api/saler/login:
 *   post:
 *     summary: Đăng nhập của người bán hàng vào Shop Management
 *     description: Đăng nhập và xác thực người bán hàng vào hệ thống quản lý cửa hàng.
 *     tags:
 *       - Saler
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của người bán hàng.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của người bán hàng.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về thông tin người bán hàng và mã token truy cập.
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *             access_token:
 *               type: string
 *       401:
 *         description: Lỗi xác thực, mật khẩu không chính xác.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Lỗi, email không tồn tại.
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
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Shop,
          as: "shops",
          include: [
            {
              model: Package,
              as: "package",
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    if (user.role !== ROLE) {
      return res.status(404).json({ message: "Không có quyền truy cập" });
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
    log(`Lỗi đăng nhập trang shop: ${error}`);
    res.status(500).json({ message: "Lỗi xử lý" });
  }
};

/**
 * @swagger
 * /api/saler/register:
 *   post:
 *     summary: Đăng ký người bán hàng vào Shop Management
 *     description: Đăng ký và tạo tài khoản người bán hàng trong hệ thống quản lý cửa hàng.
 *     tags:
 *       - Saler
 *     parameters:
 *       - name: full_name
 *         in: formData
 *         description: Tên đầy đủ của người bán hàng.
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của người bán hàng.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của người bán hàng.
 *         required: true
 *         type: string
 *       - name: phone_number
 *         in: formData
 *         description: Số điện thoại của người bán hàng.
 *         required: true
 *         type: string
 *       - name: address
 *         in: formData
 *         description: Địa chỉ của người bán hàng.
 *         required: true
 *         type: string
 *       - name: shop_name
 *         in: formData
 *         description: Tên cửa hàng của người bán hàng.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công, trả về mã token truy cập.
 *         schema:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *       400:
 *         description: Lỗi, email đã được sử dụng.
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
const register = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, address } = req.body;
    const { shop_name } = req.body;
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcryptService.hash(password);

    // Tạo một bản ghi người dùng mới
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
      role: ROLE,
      status: 1,
    });

    const trialPackage = await Package.findOne({
      where: { name: TRIAL_PACKAGE },
    });

    const shop_info = {
      name: shop_name,
      user_id: newUser.dataValues.id,
      package_id: trialPackage.id,
      logo: "",
      created_at: new Date(),
      description: "",
      address,
      phone_number,
      status: 1,
    };

    await Shop.create(shop_info);

    const access_token = await jwtService.generateToken(newUser.dataValues);

    return res.json({ user: newUser, access_token });
  } catch (error) {
    log(`Lỗi đăng ký trang customer: ${error}`);
    res.status(500).json({ message: "Lỗi xử lý" });
  }
};

const refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, truy cập bị từ chối" });
  }

  try {
    const decoded = await jwtService.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    if (decoded.role === ROLE) {
      const access_token = await jwtService.generateToken(decoded);
      return res.status(200).json({ user: decoded, access_token });
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  } catch (err) {
    console.log(err);
    log("Lỗi khi refresh api shop: " + err);
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};
module.exports = {
  login,
  register,
  refresh,
};
