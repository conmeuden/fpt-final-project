/*
Route cho shop dùng:
api cần dung:
lấy tất cả product : phân trang, tìm kiếm, lọc giá, status,category_id
 */

const findAll = (req, res) => {
  return res.json({ message: "findAll" });
};
const findById = (req, res) => {
  return res.json({ message: "findById" });
};
const create = (req, res) => {
  return res.json({ message: "create" });
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
