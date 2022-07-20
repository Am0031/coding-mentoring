const {
  Mentor,
  Framework,
  AssignedTask,
  Mentee,
  Partnership,
  Task,
} = require("../../models");

const getMentors = async (req, res) => {
  try {
    const { userType } = req.session;
    const mentors = await Mentor.findAll({
      attributes: [
        "id",
        "username",
        "collaborationFormat",
        "location",
        "email",
        "availability",
      ],
      include: [
        {
          model: Framework,
          attributes: ["id", "frameworkName"],
          through: { attributes: ["level"], as: "level" },
        },
      ],
    });
    if (!mentors) {
      return res.status(500).json({ message: "Mentors not found" });
    }

    const formatMentors = (each) => {
      const id = each.id;
      const username = each.username;
      const collaborationFormat = each.collaborationFormat;
      const location = each.location;
      const email = each.email;
      const availability = each.availability;
      const frameworks = each.frameworks.map((i) => {
        const id = i.id;
        const name = i.frameworkName;
        const level = i.level.level;
        return { id, name, level };
      });

      const response = {
        id,
        username,
        collaborationFormat,
        location,
        email,
        availability,
        frameworks,
      };
      return response;
    };

    const formattedMentors = mentors.map(formatMentors);

    const { framework, collaborationFormat, location } = req.body;

    //flitering on only 1 teaching format at a time, and only one city at a time
    const filteredMentors = formattedMentors
      .filter((item) => !location || item.location === location)
      .filter(
        (item) =>
          !collaborationFormat ||
          item.collaborationFormat === collaborationFormat
      )
      .filter(
        (item) =>
          framework.length === 0 ||
          item.frameworks
            .map((i) => i.id)
            .some((element) => framework.includes(element))
      );

    return res.json({ userType: userType, mentors: filteredMentors });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findByPk(id, {
      attributes: [
        "id",
        "username",
        "collaborationFormat",
        "personalGoal",
        "location",
        "availability",
        "email",
        "profileImageUrl",
        "gitHubUrl",
        "xp",
      ],
      include: [
        {
          model: Framework,
          attributes: ["id", "frameworkName"],
          through: { attributes: ["level"], as: "level" },
        },
      ],
    });
    if (!mentor) {
      return res.status(500).json({ message: "Mentor not found" });
    }
    return res.json(mentor);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateMentorById = async (req, res) => {
  try {
    const { id } = req.session.user;
    // await Mentor.findByPk(id);

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
    } = req.body;

    await Mentor.update(
      {
        firstName,
        lastName,
        username,
        email,
        password,
        location,
        availability,
        collaborationFormat,
        personalGoal,
        profileImageUrl,
        gitHubUrl,
      },
      { where: { id } }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `[ERROR]: Failed to update mentor | ${error.message}`,
    });
  }
};

//maybe - if someone wants to delete their account - how do we do that
const deleteMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findByPk(id);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    await Mentor.destroy({ where: { id } });
    return res.status(200).json({ message: "Mentor deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMentorData = async (req, res) => {
  try {
    const { id } = req.params;

    const mentorData = await Partnership.findAll({
      attributes: ["id", "projectName"],
      where: { mentorId: id },
      include: [
        { model: Mentee, attributes: ["id", "username"], as: "mentee" },
        { model: Mentor, attributes: ["id", "username"], as: "mentor" },
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
    if (!mentorData) {
      return res.status(500).json({ message: "Mentor data not found" });
    }
    return res.json(mentorData);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getMentors,
  getMentorById,
  updateMentorById,
  deleteMentorById,
  getMentorData,
};
