const {
  Framework,
  Mentee,
  Mentor,
  Task,
  Partnership,
} = require("../../models");

const renderDashboard = async (req, res) => {
  const { userType, user } = req.session;
  const id = user.id;
  //need to work out which api call to bring the right data here: their info and their partnerships and tasks etc
  let userData;
  if (userType === "mentor") {
    const data = await Partnership.findAll({
      attributes: ["id", "projectName"],
      where: { mentorId: id },
      include: [
        {
          model: Mentee,
          attributes: ["id", "username"],
          as: "mentee",
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
        { model: Mentor, attributes: ["id", "username"], as: "mentor" },
        {
          model: Task,
          through: { attributes: ["id", "taskDeadline", "taskComplete"] },
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
      ],
    });
    userData = data.map((i) => i.get({ plain: true }));
  } else {
    const data = await Partnership.findAll({
      attributes: ["id", "projectName"],
      where: { menteeId: id },
      include: [
        {
          model: Mentee,
          attributes: ["id", "username"],
          as: "mentee",
        },
        {
          model: Mentor,
          attributes: ["id", "username"],
          as: "mentor",
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
        {
          model: Task,
          through: { attributes: ["taskDeadline", "taskComplete"] },
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
      ],
    });
    userData = data.map((i) => i.get({ plain: true }));
  }

  return res.render("dashboard", {
    user: user,
    userData: userData,
    userType: userType,
    currentPage: "dashboard",
  });
};

const renderMenteeSearch = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("mentee-search", {
      data: data,
      currentPage: "mentees",
    });
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
    const partnershipsFromDb = await Partnership.findAll({
      where: { mentorId: req.session.user.id },
      include: [
        {
          model: Mentee,
          attributes: ["id", "username"],
        },
      ],
    });

    const partnerships = partnershipsFromDb.map(
      (partnership) => partnership.dataValues
    );

    const mentees = partnershipsFromDb.map(
      (partnership) => partnership.mentee.dataValues
    );

    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("task-search", { data: data, mentees: mentees });
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

const renderCreateTask = async (req, res) => {
  try {
    const { id } = req.session.user;
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    } else {
      const data = frameworks.map((d) => d.dataValues);
      return res.render("createTask", { user: id, data: data });
    }
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const renderEditInfo = async (req, res) => {
  const email = req.session.user.email;

  const mentor = await Mentor.findOne({ where: { email } });
  const mentee = await Mentee.findOne({ where: { email } });

  let currentUser;
  let userType;

  if (mentor) {
    currentUser = mentor.getUser();
    userType = "mentor";
  } else {
    currentUser = mentee.getUser();
    userType = "mentee";
  }

  // console.log(currentUser);
  // console.log(userType);

  return res.render("editInfo", { currentUser, userType });
};

module.exports = {
  renderDashboard,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskSearch,
  renderTaskDetails,
  renderCreateTask,
  renderEditInfo,
};
