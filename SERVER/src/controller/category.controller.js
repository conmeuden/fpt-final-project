const { Category, Shop } = require("../models/index");
const { Op } = require("sequelize");

const findAll = async (req, res) => {
  try {
    const { user, query } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { page, limit, keyword, status } = query;

    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {
      shop_id,
    };

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }

    if (status) {
      whereCondition.status = { [Op.like]: `%${status}%` };
    }

    const categories = await Category.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findById = async (req, res) => {
  try {
    const { user, params } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { id } = params;
    const category = await Category.findOne({ where: { id, shop_id } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { user, body } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { name, status } = body;
    const category = await Category.create({
      name,
      shop_id,
      status,
    });

    return res.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { user, params, body } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { id } = params;
    const { name, status } = body;

    const [updatedRows] = await Category.update(
      { name, status },
      { where: { id, shop_id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { user, params } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { id } = params;
    const [updatedRows] = await Category.update(
      { status: 0 },
      { where: { id, shop_id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
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
