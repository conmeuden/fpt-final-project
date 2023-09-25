const { Op } = require("sequelize");
const { Coupon } = require("../models"); // Import model Coupon

// Lấy danh sách tất cả các mã giảm giá (coupons) với phân trang và tìm kiếm
const findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {};

    if (keyword) {
      whereCondition.code = { [Op.like]: `%${keyword}%` };
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy thông tin một mã giảm giá theo ID
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy thông tin một mã giảm giá theo mã (code)
const findByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with code ${code}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo một mã giảm giá mới
const create = async (req, res) => {
  try {
    const {
      shop_id,
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật thông tin một mã giảm giá theo ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    } = req.body;

    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    await coupon.update({
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

    return res.json(coupon);
  } catch (error) {
    console.error(`Error updating coupon with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa một mã giảm giá theo ID (cài đặt status = 0 thay vì xóa)
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    await coupon.update({ status: 0 });

    return res.json({ message: "Coupon deactivated successfully" });
  } catch (error) {
    console.error(`Error deactivating coupon with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
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
