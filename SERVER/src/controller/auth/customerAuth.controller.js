const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const FacebookStrategy = require("passport-facebook");
const { v4: uuid } = require("uuid");
const { Shop, User, Package } = require("../../models/index");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");
const { OAuth2Client } = require("google-auth-library");

const ROLE = "CUSTOMER";

const clientId = process.env.GOOGLE_CLIENT_ID;

const oAuth2Client = new OAuth2Client({
  clientId: clientId,
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
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
    log(`Lỗi đăng nhập trang customer: ${error}`);
    res.status(500).json({ message: "Lỗi xử lý" });
  }
};

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
    res.status(500).json({ message: "Lỗi xử lý" });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { access_token } = req.body;
    const decode = await oAuth2Client.verifyIdToken({
      idToken: access_token,
      audience: clientId,
    });
    const { email, name } = decode.payload;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser.role !== ROLE) {
      return res.status(404).json({ message: "Không có quyền truy cập" });
    }

    if (existingUser) {
      const access_token = await jwtService.generateToken(existingUser);
      res.status(200).json({ user: existingUser, access_token });
    } else {
      const newUser = await User.create({
        full_name: name,
        email,
        password: "",
        phone_number: "",
        address: "",
        role: ROLE,
        status: 1,
      });

      const access_token = await jwtService.generateToken(newUser);
      res.status(200).json({ user: newUser, access_token });
    }
  } catch (error) {
    log(`Lỗi loginWithGoogle() CUSTOMER AUTH: ${error}`);
    res.status(500).json({ message: "Lỗi xử lý" });
  }
};

const loginWithFacebook = passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/customer/facebook/callback",
      profileFields: ["email", "photos", "id", "displayName"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const [user] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            email: profile.emails[0].value,
            full_name: profile.displayName,
            password: "",
            phone_number: "",
            address: "",
            role: ROLE,
            status: 1,
          },
        });

        const access_token = await jwtService.generateToken(user);

        return cb(null, user, access_token);
      } catch (error) {
        log(`Lỗi đăng nhập Facebook: ${error}`);
        return cb(error, null);
      }
    }
  )
);

module.exports = {
  login,
  register,
  loginWithGoogle,
  loginWithFacebook,
};
