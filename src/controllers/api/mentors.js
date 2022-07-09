const { Mentor, Framework } = require("../../models");

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      attributes: ["id", "username", "teachingFormat", "location"],
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
      const teachingFormat = each.teachingFormat;
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
        teachingFormat,
        location,
        email,
        frameworks,
      };
      return response;
    };

    const formattedMentors = mentors.map(formatMentors);

    const { framework, teachingFormat, location } = req.body;

    //need to make sure we are getting this as an array (from the framework checkboxes) empty array if "all" or array of the id of the frameworks selected
    //otherwise, we would need the below checkpoint - and filter on frameworkArray below in the 3rd filter
    // const frameworkArray = [];
    // Array.isArray(framework)
    //   ? frameworkArray.push(...framework)
    //   : frameworkArray.push(framework);

    //flitering on only 1 teaching format at a time, and only one city at a time
    const filteredMentors = formattedMentors
      .filter((item) => !location || item.location === location)
      .filter(
        (item) => !teachingFormat || item.teachingFormat === teachingFormat
      )
      .filter(
        (item) =>
          framework.length === 0 ||
          item.frameworks
            .map((i) => i.id)
            .some((element) => framework.includes(element))
      );

    return res.json(filteredMentors);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findByPk(id, {
      attributes: ["id", "username", "teachingFormat", "location", "email"],
      include: [{ model: Framework, attributes: ["frameworkName"] }],
    });
    if (!mentor) {
      return res.status(500).json({ message: "Mentor not found" });
    }
    return res.json(mentor);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

//maybe - if we have an edit option on the front end
const updateMentorById = async (req, res) => {
  return res.json({ message: "updating mentor by ID" });
};

//maybe - if someone wants to delete their account - how do we do that
const deleteMentorById = async (req, res) => {
  return res.json({ message: "deleting mentor by ID" });
};

module.exports = {
  getMentors,
  getMentorById,
  updateMentorById,
  deleteMentorById,
};
