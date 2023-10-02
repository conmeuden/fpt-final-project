const { Shop, Package, User } = require("../models/index");
const { Op } = require("sequelize");

const findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "", status = "" } = req.query;

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    if (status) {
      whereCondition.status = status;
    }

    // Sử dụng phân trang và điều kiện tìm kiếm
    const shops = await Shop.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    return res.json({
      page,
      limit,
      shops,
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: Package, as: "package" },
      ],
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.json(shop);
  } catch (error) {
    console.error(`Error fetching shop with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      user_id,
      package_id,
      logo,
      description,
      address,
      phone_number,
      status,
    } = req.body;
    const newShop = await Shop.create({
      name,
      user_id,
      package_id,
      logo,
      created_at: new Date(),
      description,
      address,
      phone_number,
      status,
    });
    return res.status(201).json(newShop);
  } catch (error) {
    console.error("Error creating shop:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      user_id,
      package_id,
      logo,
      description,
      address,
      phone_number,
      status,
    } = req.body;
    const existingShop = await Shop.findByPk(id);

    if (!existingShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    existingShop.name = name;
    existingShop.user_id = user_id;
    existingShop.package_id = package_id;
    existingShop.logo = logo;
    existingShop.description = description;
    existingShop.address = address;
    existingShop.phone_number = phone_number;
    existingShop.status = status;

    await existingShop.save();

    return res.json(existingShop);
  } catch (error) {
    console.error(`Error updating shop with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await Shop.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error(`Error deleting shop with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
