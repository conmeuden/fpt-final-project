const { Package } = require("../models/index");

// Lấy danh sách tất cả các gói (GET /packages)
const findAll = async (req, res) => {
  try {
    const packages = await Package.findAll();
    return res.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy thông tin của một gói theo ID (GET /packages/:id)
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findByPk(id);

    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    return res.json(package);
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo một gói mới (POST /packages)
const create = async (req, res) => {
  try {
    const { name, price, date, status } = req.body;
    const newPackage = await Package.create({
      name,
      price,
      date,
      status,
    });
    return res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật thông tin của một gói theo ID (PUT /packages/:id)
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, date, status } = req.body;
    const existingPackage = await Package.findByPk(id);

    if (!existingPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    existingPackage.name = name;
    existingPackage.price = price;
    existingPackage.date = date;
    existingPackage.status = status;

    await existingPackage.save();

    return res.json(existingPackage);
  } catch (error) {
    console.error(`Error updating package with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa một gói theo ID (DELETE /packages/:id)
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await Package.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: "Package not found" });
    }

    return res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
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
