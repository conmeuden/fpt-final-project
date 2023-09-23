const findAll = (req, res) => {
  return res.json({ message: "findAll" });
};
const findById = (req, res) => {
  return res.json({ message: "findById" });
};
const findByCode = (req, res) => {
  return res.json({ message: "findByCode" });
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
  findByCode,
  findById,
  create,
  update,
  remove,
};
