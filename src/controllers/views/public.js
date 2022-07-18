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

const renderContactPage = (req, res) => {
  const { isLoggedIn } = req.session;
  return res.render("contact", { isLoggedIn, currentPage: "contact" });
};

const renderMentorSearch = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const { isLoggedIn } = req.session;
    const data = frameworks.map((d) => d.dataValues);
    return res.render("mentor-search", {
      isLoggedIn,
      data: data,
      currentPage: "mentors",
    });
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
const renderResetPasswordPage = (req, res) => {
  return res.render("resetPassword", { currentPage: "resetPassword" });
};
module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderContactPage,
  renderMentorSearch,
  renderMentorProfile,
  renderFAQPage,
  renderResetPasswordPage,
};
