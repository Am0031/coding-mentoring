const { Mentee, Framework } = require("../../models");

const getMentees = async (req, res) => {
  try {
    const mentees = await Mentee.findAll({
      attributes: ["id", "username", "learningFormat", "location"],
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
      const learningFormat = each.learningFormat;
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
        learningFormat,
        location,
        email,
        frameworks,
      };
      return response;
    };

    const formattedMentees = mentees.map(formatMentees);

    const { framework, learningFormat, location } = req.body;

    //flitering on only 1 teaching format at a time, and only one city at a time
    //filtering on an array of frameworks (always in array format in body)
    const filteredMentees = formattedMentees
      .filter((item) => !location || item.location === location)
      .filter(
        (item) => !learningFormat || item.learningFormat === learningFormat
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
  return res.json({ message: "getting mentee by ID" });
};

const updateMenteeById = async (req, res) => {
  return res.json({ message: "updating mentee by ID" });
};

const deleteMenteeById = async (req, res) => {
  return res.json({ message: "deleting mentee by ID" });
};

module.exports = {
  getMentees,
  getMenteeById,
  updateMenteeById,
  deleteMenteeById,
};
