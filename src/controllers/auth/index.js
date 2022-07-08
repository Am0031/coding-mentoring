const login = (req, res) => {
  console.log("login");
  return res.json({ message: "login" });
};
const signup = (req, res) => {
  console.log("signup");
  return res.json({ message: "signup" });
};
const logout = (req, res) => {
  console.log("logout");
  return res.json({ message: "logout" });
};

module.exports = { login, signup, logout };
