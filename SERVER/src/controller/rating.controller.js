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
