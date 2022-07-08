const bcrypt = require("bcrypt");

const hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);

  return user;
};

module.exports = { hashPassword };
