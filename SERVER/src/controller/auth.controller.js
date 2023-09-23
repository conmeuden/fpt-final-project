const login = (req, res) => {
  return res.json({ message: "login" });
};
const register = (req, res) => {
  return res.json({ message: "register" });
};

module.exports = {
  login,
  register,
};
