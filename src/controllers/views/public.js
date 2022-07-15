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

const renderMentorProfile = async (req, res) => {
  const { id } = req.params;
  const mentor = await Mentor.findByPk(id);
  const chosenMentor = mentor.getUser();
  return res.render("mentor-profile", { user: chosenMentor });
};
const renderFAQPage = (req, res) => {
  return res.render("faq", { currentPage: "faq" });
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderMentorSearch,
  renderMentorProfile,
  renderFAQPage,
};
