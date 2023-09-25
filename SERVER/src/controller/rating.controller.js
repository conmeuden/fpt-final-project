const { Rating } = require("../models"); // Import model Rating

// Lấy tất cả đánh giá
const findAll = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    return res.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy đánh giá theo ID
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    return res.json(rating);
  } catch (error) {
    console.error(`Error fetching rating with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo bài đánh giá mới
const create = async (req, res) => {
  try {
    const { product_id, star, comment, user_id, created_at, status } = req.body;
    const newRating = await Rating.create({
      product_id,
      star,
      comment,
      user_id,
      created_at,
      status,
    });
    return res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật đánh giá theo ID
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    const { product_id, star, comment, user_id, created_at, status } = req.body;
    await rating.update({
      product_id,
      star,
      comment,
      user_id,
      created_at,
      status,
    });
    return res.json(rating);
  } catch (error) {
    console.error(`Error updating rating with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa đánh giá theo ID
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Rating.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    return res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error(`Error deleting rating with ID ${id}:`, error);
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
