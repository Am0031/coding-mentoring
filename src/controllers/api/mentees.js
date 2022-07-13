const {
  Mentee,
  Framework,
  Task,
  Partnership,
  Mentor,
} = require("../../models");

const getMentees = async (req, res) => {
  try {
    const mentees = await Mentee.findAll({
      attributes: ["id", "username", "collaborationFormat", "location"],
      include: [
        {
          model: Framework,
          attributes: ["id", "frameworkName"],
          through: { attributes: ["level"], as: "level" },
        },
      ],
    });
    if (!mentees) {
      return res.status(500).json({ message: "Mentees not found" });
    }

    const formatMentees = (each) => {
      const id = each.id;
      const username = each.username;
      const collaborationFormat = each.collaborationFormat;
      const location = each.location;
      const email = each.email;
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
        frameworks,
      };
      return response;
    };

    const formattedMentees = mentees.map(formatMentees);

    const { framework, collaborationFormat, location } = req.body;

    //flitering on only 1 teaching format at a time, and only one city at a time
    //filtering on an array of frameworks (always in array format in body)
    const filteredMentees = formattedMentees
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

    return res.json(filteredMentees);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getMenteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentee = await Mentee.findByPk(id, {
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
    if (!mentee) {
      return res.status(500).json({ message: "Mentee not found" });
    }
    return res.json(mentee);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const updateMenteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentee = await Mentee.findByPk(id);

    if (!mentee) {
      return res.status(404).json({ message: "Mentee not found" });
    }

    const passedInfo = req.body;
    if (!passedInfo) {
      return res.status(500).json({ message: "Unable to update mentee" });
    }

    await Mentee.update(passedInfo, { where: { id } });

    return res.status(200).json({ message: "Mentee updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const deleteMenteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentee = await Mentee.findByPk(id);

    if (!mentee) {
      return res.status(404).json({ message: "Mentee not found" });
    }

    await Mentee.destroy({ where: { id } });
    return res.status(200).json({ message: "Mentee deleted" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getMenteeData = async (req, res) => {
  try {
    const { id } = req.params;
    const menteeData = await Task.findAll({
      include: [
        {
          model: Framework,
          attributes: ["frameworkName"],
        },
        {
          model: Partnership,
          attributes: ["menteeId"],
          include: [{ model: Mentor }, { model: Mentee }],
          through: {
            attributes: ["partnershipId"],
          },
          where: { menteeId: id },
        },
      ],
    });
    if (!menteeData) {
      return res.status(500).json({ message: "Mentee data not found" });
    }
    return res.json(menteeData);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

module.exports = {
  getMentees,
  getMenteeById,
  updateMenteeById,
  deleteMenteeById,
  getMenteeData,
};
