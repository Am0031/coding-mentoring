const { Framework } = require("../../models");

const getAllFrameworks = (req, res) => {
  return res.json({ message: "getting all frameworks" });
};

module.exports = {
  getAllFrameworks,
};
