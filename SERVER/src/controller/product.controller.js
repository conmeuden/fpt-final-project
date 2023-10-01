const { Category, Shop, Product } = require("../models");
const { log } = require("../services/discord.logger");
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

    const {
      page = 1,
      limit = 10,
      keyword = "",
      min_price,
      max_price,
      status,
      category_id,
      barcode,
    } = query;

    const whereCondition = { shop_id };

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }
    if (category_id) {
      whereCondition.category_id = category_id;
    }

    if (min_price && max_price) {
      whereCondition.base_price = { [Op.between]: [min_price, max_price] };
    } else if (min_price) {
      whereCondition.base_price = { [Op.gte]: min_price };
    } else if (max_price) {
      whereCondition.base_price = { [Op.lte]: max_price };
    }

    if (status) {
      whereCondition.status = status;
    }

    if (barcode) {
      whereCondition.barcode = barcode;
    }

    const products = await Product.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.json({
      page,
      limit,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi xử lý" });
  }
};

const findById = async (req, res) => {
  try {
    const { user, params } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    const shop_id = shop.id;

    const { id } = params;
    const product = await Product.findOne({
      where: {
        id,
        shop_id,
      },
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    log(`Error fetching product with ID ${id}: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { user, body } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    const shop_id = shop.id;

    const newProduct = await Product.create({
      ...body,
      shop_id,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    log(`Error creating product: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { user, params, body } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    const shop_id = shop.id;
    const { id } = params;

    const existingProduct = await Product.findOne({ where: { id, shop_id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(existingProduct, body, { shop_id });

    await existingProduct.save();

    return res.json(existingProduct);
  } catch (error) {
    log(`Error updating product with ID ${id}: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { user, params } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    const shop_id = shop.id;
    const { id } = params;

    const updatedRows = await Product.update(
      { status: 0 },
      { where: { id, shop_id } }
    );

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    log(`Error deleting product with ID ${id}: ${error}`);
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
