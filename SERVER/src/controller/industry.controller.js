const Industry = require("../models/industry.model");
const { Op } = require("sequelize");

// Lấy danh sách tất cả các industries (GET /industries)
const findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1, // Trang mặc định là 1 nếu không có tham số
      limit: parseInt(limit, 10) || 10, // Giới hạn số mục trên mỗi trang, mặc định là 10 nếu không có tham số
    };

    // Điều kiện tìm kiếm
    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    // Tìm kiếm, phân trang và trả về kết quả
    const industries = await Industry.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      industries,
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy một industry theo ID (GET /industries/:id)
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }
    return res.json(industry);
  } catch (error) {
    console.error(`Error fetching industry with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo một industry mới (POST /industries)
const create = async (req, res) => {
  const { name, icon, status } = req.body;
  try {
    const industry = await Industry.create({ name, icon, status });
    return res.json(industry);
  } catch (error) {
    console.error("Error creating industry:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật thông tin một industry (PUT /industries/:id)
const update = async (req, res) => {
  const { id } = req.params;
  const { name, icon, status } = req.body;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }
    industry.name = name;
    industry.icon = icon;
    industry.status = status;
    await industry.save();
    return res.json(industry);
  } catch (error) {
    console.error(`Error updating industry with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa một industry theo ID (DELETE /industries/:id)
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    // Thay vì xóa mục, hãy cập nhật trường status thành 0
    industry.status = 0;
    await industry.save();

    return res.json({ message: "Industry marked as deleted" });
  } catch (error) {
    console.error(`Error marking industry with ID ${id} as deleted:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
