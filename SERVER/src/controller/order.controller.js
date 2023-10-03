const { Order } = require("../models/index");
const { Op } = require("sequelize");

const findAll = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }

    const orders = await Order.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      orders,
    });
  } catch (error) {
    console.log("Error fetching orders", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json(order);
  } catch (error) {
    console.log("Error fetching order with ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const create = async (req, res) => {
  try {
    const {
      created_at,
      shop_id,
      user_id,
      total_price,
      coupon,
      discount,
      payment,
      status,
    } = req.body;
    const order = await Order.create({
      created_at,
      shop_id,
      user_id,
      total_price,
      coupon,
      discount,
      payment,
      status,
    });
    return res.json(order);
  } catch (error) {
    console.log("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const update = (req, res) => {
  return res.json({ message: "update" });
};
const remove = (req, res) => {
  return res.json({ message: "remove" });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
