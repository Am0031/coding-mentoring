const { Mentor } = require("../../models");

const getAllMentors = (req, res) => {
  return res.json({ message: "getting all mentors" });
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
