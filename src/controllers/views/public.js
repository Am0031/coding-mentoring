const { Framework, Mentor, Mentee } = require("../../models");

const renderHomePage = (req, res) => {
  const { isLoggedIn } = req.session;
  return res.render("home", { isLoggedIn, currentPage: "home" });
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderInfoPage = (req, res) => {
  return res.render("info", { currentPage: "info" });
};

const renderMentorSearch = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("mentor-search", { data: data });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const renderMentorProfile = (req, res) => {
  return res.render("mentor-profile");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderMentorSearch,
  renderMentorProfile,
};
