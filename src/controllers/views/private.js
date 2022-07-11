const renderDashboard = (req, res) => {
  return res.render("dashboard");
};

const renderMenteeSearch = (req, res) => {
  return res.render("mentor-search");
};

const renderMenteeProfile = (req, res) => {
  return res.render("mentor-profile");
};

const renderTaskSearch = (req, res) => {
  return res.render("task-search");
};

const renderTaskDetails = (req, res) => {
  return res.render("task-details");
};

module.exports = {
  renderDashboard,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskSearch,
  renderTaskDetails,
};
