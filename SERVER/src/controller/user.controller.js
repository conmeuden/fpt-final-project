const userModel = require("../models/user.model");

const findAll = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
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
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    await user.destroy();
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
