const { Op } = require("sequelize");
const { Coupon, Shop } = require("../models");
const { log } = require("../services/discord.logger");
const findAll = async (req, res) => {
  try {
    const { user } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

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
    log(`Lỗi hàm findAll coupons : ${error}`);
    console.error("Error fetching coupons:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findById = async (req, res) => {
  try {
    const { user } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { id } = req.params;
    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    log(`Lỗi hàm findById coupons : ${error}`);

    console.error(`Error fetching coupon with ID ${id}:`, error);
    return res.status(500).json({ message: error.message });
  }
};

const findByCode = async (req, res) => {
  try {
    const { user } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { code } = req.params;
    const coupon = await Coupon.findOne({ where: { code, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
    }

    return res.json(coupon);
  } catch (error) {
    log(`Lỗi hàm findByCode coupons : ${error}`);

    console.error(`Error fetching coupon with code ${code}:`, error);
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { user } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const {
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
    } = req.body;

    // Check if the code is unique
    const existingCoupon = await Coupon.findOne({
      where: { code, shop_id },
    });

    if (existingCoupon) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
    }

    const newCoupon = await Coupon.create({
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status: 1,
    });

    return res.status(201).json(newCoupon);
  } catch (error) {
    log(`Lỗi hàm create coupons : ${error}`);

    console.error("Error creating coupon:", error);
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { user } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

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

    // Check if the code is unique
    const existingCoupon = await Coupon.findOne({
      where: { code, shop_id, id: { [Op.not]: id } },
    });

    if (existingCoupon) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
    }

    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
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
    log(`Lỗi hàm update coupons : ${error}`);

    console.error(`Error updating coupon with ID ${id}:`, error);
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { user, body } = req;
    const shop = await Shop.findOne({ where: { user_id: user.id } });
    if (!shop) {
      return res
        .status(401)
        .json({ message: "Bạn chưa có cửa hàng để truy cập" });
    }
    const shop_id = shop.id;

    const { id } = req.params;
    const coupon = await Coupon.findOne({ where: { id, shop_id } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.update({ status: 0 });

    return res.json({ message: "Coupon deactivated successfully" });
  } catch (error) {
    log(`Lỗi hàm remove coupons : ${error}`);

    console.error(`Error deactivating coupon with ID ${id}:`, error);
    return res.status(500).json({ message: error.message });
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
