// DÙNG CHO KHÁCH HÀNG ĐĂNG NHẬP THƯƠNG MẠI ĐIỆN TỬ ĐỂ MUA HÀNG
const { Shop, User, Package } = require("../../models/index");
const jwtService = require("../../services/jwt.service");
const bcryptService = require("../../services/bcrypt.service");
const { log } = require("../../services/discord.logger");

const ROLE = "CUSTOMER";
const TRIAL_PACKAGE = "Trial Package";

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

    console.log(newUser.dataValues);
    console.log(trialPackage);

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

    return res.json({ access_token });
  } catch (error) {
    log(`Lỗi đăng ký trang customer: ${error}`);
    res.status(500).json({ error: "Lỗi xử lý" });
  }
};

module.exports = {
  login,
  register,
};
