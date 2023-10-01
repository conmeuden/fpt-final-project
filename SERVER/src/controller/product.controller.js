/*
Route cho shop dùng:
api cần dung:
lấy tất cả product : phân trang, tìm kiếm, lọc giá, status,category_id
 */

const { Category } = require("../models");
const Product = require("../models/product.model");
const { log } = require("../services/discord.logger");
const { Op } = require("sequelize");

const findAll = async (req, res) => {
  try {
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const {
      page = 1,
      limit = 10,
      keyword = "",
      min_price,
      max_price,
      status,
      category_id,
      barcode,
    } = req.query;

    const whereCondition = {
      shop_id,
    };

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
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

    if (category_id) {
      whereCondition.category_id = category_id;
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
    // log(`Lỗi khi lấy danh sách sản phẩm: ${error}`);
    return res.status(500).json({ message: "Lỗi xử lý" });
  }
};

const findById = async (req, res) => {
  try {
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const { id } = req.params;
    const product = await Product.findByPk(id, {
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
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const {
      name,
      images,
      industry_id,
      description,
      keywords,
      base_price,
      sale_price,
      import_price,
      total_like,
      properties,
      variant_list,
      created_at,
      stock,
      category_id,
      status,
    } = req.body;

    const newProduct = await Product.create({
      name,
      images,
      industry_id,
      description,
      keywords,
      base_price,
      sale_price,
      import_price,
      total_like,
      properties,
      variant_list,
      created_at,
      stock,
      category_id,
      status,
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
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const { id } = req.params;
    const {
      name,
      images,
      industry_id,
      description,
      keywords,
      base_price,
      sale_price,
      import_price,
      total_like,
      properties,
      variant_list,
      created_at,
      stock,
      category_id,
      status,
    } = req.body;

    const existingProduct = await Product.findOne({ where: { id, shop_id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.name = name;
    existingProduct.images = images;
    existingProduct.industry_id = industry_id;
    existingProduct.description = description;
    existingProduct.keywords = keywords;
    existingProduct.base_price = base_price;
    existingProduct.sale_price = sale_price;
    existingProduct.import_price = import_price;
    existingProduct.total_like = total_like;
    existingProduct.properties = properties;
    existingProduct.variant_list = variant_list;
    existingProduct.created_at = created_at;
    existingProduct.stock = stock;
    existingProduct.category_id = category_id;
    existingProduct.status = status;

    await existingProduct.save();

    return res.json(existingProduct);
  } catch (error) {
    log(`Error updating product with ID ${id}: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const { id } = req.params;
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
