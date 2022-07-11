const { Framework } = require("../../models");

const renderHomePage = (req, res) => {
  return res.json({ message: "showing home page" });
};

const renderLoginPage = (req, res) => {
  return res.json({ message: "showing login" });
};

const renderSignupPage = (req, res) => {
  return res.json({ message: "showing signup" });
};

const renderInfoPage = (req, res) => {
  return res.json({ message: "showing info page" });
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
  return res.json({ message: "showing mentor profile" });
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderMentorSearch,
  renderMentorProfile,
};
