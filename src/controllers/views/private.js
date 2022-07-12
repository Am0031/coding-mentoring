const { Framework, Mentee, Task } = require("../../models");

const renderDashboard = async (req, res) => {
  const { userType, user } = req.session;
  //need to work out which api call to bring the right data here: their info and their partnerships and tasks etc
  return res.render("dashboard", { user: user });
};

const renderMenteeSearch = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("mentee-search", { data: data });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const renderMenteeProfile = async (req, res) => {
  const { id } = req.params;
  const mentee = await Mentee.findByPk(id);
  const chosenMentee = mentee.getUser();
  return res.render("mentee-profile", { user: chosenMentee });
};

const renderTaskSearch = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("task-search", { data: data });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const renderTaskDetails = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  //need to check if the task fields need formatting before passing them to the render function
  const chosenTask = task;
  return res.render("task-details", { user: chosenTask });
};

module.exports = {
  renderDashboard,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskSearch,
  renderTaskDetails,
};
