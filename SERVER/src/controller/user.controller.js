const userModel = require("../models/user.model");
const { Op } = require("sequelize");

const findAll = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    // Điều kiện tìm kiếm
    const whereCondition = {};

    if (keyword) {
      whereCondition.full_name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    // Tìm kiếm và phân trang
    const users = await userModel.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  }
};

const findById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  }
};

const create = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi tạo người dùng" });
  }
};

const update = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    await user.update(req.body);
    res.json({ message: "Cập nhật người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật người dùng" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRows = await userModel.update(
      { status: 0 },
      { where: { id } }
    );
    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa người dùng" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
