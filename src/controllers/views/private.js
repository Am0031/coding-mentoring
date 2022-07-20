const {
  Framework,
  Mentee,
  Mentor,
  Task,
  Partnership,
  MentorFramework,
  MenteeFramework,
} = require("../../models");

const renderDashboard = async (req, res) => {
  const { userType, user } = req.session;
  const id = user.id;

  let userData;
  if (userType === "mentor") {
    const data = await Partnership.findAll({
      attributes: ["id", "projectName"],
      where: { mentorId: id },
      include: [
        {
          model: Mentee,
          attributes: ["id", "username", "email"],
          as: "mentee",
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
        {
          model: Mentor,
          attributes: ["id", "username", "email"],
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
          attributes: ["id", "username", "email"],
          as: "mentee",
          include: [
            {
              model: Framework,
              attributes: ["id", "frameworkName"],
            },
          ],
        },
        {
          model: Mentor,
          attributes: ["id", "username", "email"],
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

  let userFrameworks;
  if (userType === "mentor") {
    const data = await MentorFramework.findAll({
      where: { mentorId: id },
      attributes: ["id", "mentorId", "frameworkId", "level"],
      include: [
        {
          model: Framework,
          attributes: ["frameworkName"],
        },
      ],
    });
    userFrameworks = data.map((i) => i.get({ plain: true }));
  } else {
    const data = await MenteeFramework.findAll({
      where: { menteeId: id },
      attributes: ["id", "menteeId", "frameworkId", "level"],
      include: [
        {
          model: Framework,
          attributes: ["frameworkName"],
        },
      ],
    });
    userFrameworks = data.map((i) => i.get({ plain: true }));
  }

  const frameworksData = await Framework.findAll({
    attributes: ["id", "frameworkName"],
  });
  const frameworks = frameworksData.map((i) => i.get({ plain: true }));

  userFrameworks.forEach((i) => {
    let index;
    frameworks.some((entry, j) => {
      if (entry.id == i.frameworkId) {
        index = j;
        return true;
      }
    });
    frameworks[index].addedId = i.id;
  });

  return res.render("dashboard", {
    user: user,
    userData: userData,
    userType: userType,
    userFrameworks: userFrameworks,
    frameworks: frameworks,
    currentPage: "dashboard",
  });
};

const renderMenteeSearch = async (req, res) => {
  try {
    const { userType } = req.session;
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    const data = frameworks.map((d) => d.dataValues);
    return res.render("mentee-search", {
      data: data,
      currentPage: "mentees",
      userType,
    });
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

// const renderMenteeProfile = async (req, res) => {
//   const { id } = req.params;
//   const mentor = await Mentee.findByPk(id, {
//     include: [
//       {
//         model: Framework,
//         through: ["frameworkId"],
//         attributes: ["frameworkName"],
//       },
//     ],
//   });
//   const chosenMentee = mentor.get({ plain: true });
//   return res.render("mentee-profile", { user: chosenMentee });
// };

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
    return res.render("task-search", {
      data: data,
      mentees: mentees,
      partnerships: partnerships,
    });
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
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
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const renderEditInfo = async (req, res) => {
  const { userType } = req.session;

  let userFromDb;

  if (userType === "mentee") {
    userFromDb = await Mentee.findByPk(req.session.user.id);
  } else {
    userFromDb = await Mentor.findByPk(req.session.user.id);
  }

  const user = userFromDb.getUser();

  return res.render("editInfo", {
    currentUser: user,
    userType,
  });
};

module.exports = {
  renderDashboard,
  renderMenteeSearch,
  renderTaskSearch,
  renderTaskDetails,
  renderCreateTask,
  renderEditInfo,
};
