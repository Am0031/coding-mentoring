const renderDashboard = (req, res) => {
  // function will render mentee dashboard if user is mentee, or mentor dashboard if user is mentor
  return res.json({ message: "showing dashboard" });
};

const renderMenteeSearch = (req, res) => {
  return res.json({ message: "showing mentee search" });
};

const renderMenteeProfile = (req, res) => {
  return res.json({ message: "showing mentee profile" });
};

const renderTaskSearch = (req, res) => {
  return res.json({ message: "showing task search" });
};

const renderTaskDetails = (req, res) => {
  return res.json({ message: "showing task details" });
};

module.exports = {
  renderDashboard,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskSearch,
  renderTaskDetails,
};
