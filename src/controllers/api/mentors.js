const { Mentor, MentorFramework, Framework } = require("../../models");

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      attributes: ["id", "username", "teachingFormat", "location", "email"],
      include: [{ model: Framework, attributes: ["framework_name"] }],
    });
    if (!mentors) {
      return res.status(500).json({ message: "Mentors not found" });
    }
    return res.json(mentors);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getMentorById = (req, res) => {
  return res.json({ message: "getting mentor by ID" });
};

const createMentor = (req, res) => {
  return res.json({ message: "creating mentor" });
};

const updateMentorById = (req, res) => {
  return res.json({ message: "updating mentor by ID" });
};

const deleteMentorById = (req, res) => {
  return res.json({ message: "deleting mentor by ID" });
};

module.exports = {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentorById,
  deleteMentorById,
};
