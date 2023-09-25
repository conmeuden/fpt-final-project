const { Op } = require("sequelize");
const { Supplier } = require("../models"); // Import model Supplier

// Lấy danh sách tất cả các nhà cung cấp với phân trang và tìm kiếm
const findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }

    const suppliers = await Supplier.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      suppliers,
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy thông tin một nhà cung cấp theo ID
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    return res.json(supplier);
  } catch (error) {
    console.error(`Error fetching supplier with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo một nhà cung cấp mới
const create = async (req, res) => {
  try {
    const { name, address, shop_id, phone_number, debt, status } = req.body;
    const newSupplier = await Supplier.create({
      name,
      address,
      shop_id,
      phone_number,
      debt,
      status,
    });
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật thông tin một nhà cung cấp theo ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, shop_id, phone_number, debt, status } = req.body;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    await supplier.update({
      name,
      address,
      shop_id,
      phone_number,
      debt,
      status,
    });

    return res.json(supplier);
  } catch (error) {
    console.error(`Error updating supplier with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa một nhà cung cấp theo ID (cài đặt status = 0 thay vì xóa)
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    await supplier.update({ status: 0 });

    return res.json({ message: "Supplier deactivated successfully" });
  } catch (error) {
    console.error(`Error deactivating supplier with ID ${id}:`, error);
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
