const { Op } = require("sequelize");
const { Coupon } = require("../models");

const findAll = async (req, res) => {
  try {
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const { page = 1, limit = 10, keyword = "", status } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = { shop_id };

    if (keyword) {
      whereCondition.code = { [Op.like]: `%${keyword}%` };
    }

    if (status) {
      whereCondition.status = { [Op.like]: `%${status}%` };
    }

    const coupons = await Coupon.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      coupons,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findByCode = async (req, res) => {
  try {
    if (!req.user.shops) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có cửa hàng để thực hiện truy cập" });
    }
    const shop_id = req.user.shops[0].id;

    const { code } = req.params;
    const coupon = await Coupon.findOne({ where: { code, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with code ${code}:`, error);
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
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    } = req.body;

    const newCoupon = await Coupon.create({
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    });

    return res.status(201).json(newCoupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
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
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    } = req.body;

    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.update({
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    });

    return res.json(coupon);
  } catch (error) {
    console.error(`Error updating coupon with ID ${id}:`, error);
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
    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.update({ status: 0 });

    return res.json({ message: "Coupon deactivated successfully" });
  } catch (error) {
    console.error(`Error deactivating coupon with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findByCode,
  findById,
  create,
  update,
  remove,
};
