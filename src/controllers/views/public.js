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

const renderMentorSearch = (req, res) => {
  return res.json({ message: "showing mentor search" });
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
