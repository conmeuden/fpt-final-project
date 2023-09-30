/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: API related to customers
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const FacebookStrategy = require("passport-facebook");
const { v4: uuid } = require("uuid");
const { Shop, User, Package } = require("../../models/index");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");

const ROLE = "CUSTOMER";
const TRIAL_PACKAGE = "Trial Package";

/**
 * @swagger
 * /api/customer/login:
 *   post:
 *     summary: Đăng nhập tài khoản khách hàng
 *     description: Đăng nhập vào tài khoản khách hàng với email và mật khẩu.
 *     tags:
 *       - Customer
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của khách hàng.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của khách hàng.
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
 *               description: Thông tin khách hàng.
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
 *         description: Lỗi không tìm thấy khách hàng.
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
      where: { email, role: ROLE },
    });

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
    log(`Lỗi đăng nhập trang customer: ${error}`);
    res.status(500).json({ error: "Lỗi xử lý" });
  }
};

/**
 * @swagger
 * /api/customer/register:
 *   post:
 *     summary: Đăng ký tài khoản khách hàng
 *     description: Đăng ký tài khoản khách hàng mới với thông tin cá nhân.
 *     tags:
 *       - Customer
 *     parameters:
 *       - name: full_name
 *         in: formData
 *         description: Tên đầy đủ của khách hàng.
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của khách hàng.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của khách hàng.
 *         required: true
 *         type: string
 *       - name: phone_number
 *         in: formData
 *         description: Số điện thoại của khách hàng.
 *         required: true
 *         type: string
 *       - name: address
 *         in: formData
 *         description: Địa chỉ của khách hàng.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công.
 *         schema:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *       400:
 *         description: Lỗi xác thực, email đã được sử dụng.
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

    const access_token = await jwtService.generateToken(newUser.dataValues);

    return res.json({ access_token });
  } catch (error) {
    log(`Lỗi đăng ký trang customer: ${error}`);
    res.status(500).json({ error: "Lỗi xử lý" });
  }
};

const loginWithGoogle = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/customer/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const tokenLogin = uuid();
      profile.tokenLogin = tokenLogin;
      try {
        if (profile?.id) {
          const user = await User.findOrCreate({
            where: { email: profile.emails[0]?.value },
            defaults: {
              email: profile.emails[0]?.value,
              full_name: profile?.displayName,
              password: "",
              phone_number: "",
              address: "",
              role: ROLE,
              status: 1,
            },
          });
          accessToken = await jwtService.generateToken(user);
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile, accessToken);
    }
  )
);

const loginWithFacebook = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/customer/facebook/callback",
      profileFields: ["email", "photos", "id", "displayName"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const tokenLogin = uuid();
      profile.tokenLogin = tokenLogin;
      try {
        if (profile?.id) {
          const user = await User.findOrCreate({
            where: { email: profile.emails[0]?.value },
            defaults: {
              email: profile.emails[0]?.value,
              full_name: profile?.displayName,
              password: "",
              phone_number: "",
              address: "",
              role: ROLE,
              status: 1,
            },
          });
          accessToken = await jwtService.generateToken(user);
        }
      } catch (error) {
        console.log(error);
      }
      return cb(null, profile, accessToken);
    }
  )
);

module.exports = {
  login,
  register,
  loginWithGoogle,
  loginWithFacebook,
};
