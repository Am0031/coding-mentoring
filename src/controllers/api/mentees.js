// const { Mentee } = require("../../models");

const getAllMentees = (req, res) => {
  return res.json({ message: "getting all mentees" });
};

const getMenteeById = (req, res) => {
  return res.json({ message: "getting mentee by ID" });
};

const updateMenteeById = (req, res) => {
  return res.json({ message: "updating mentee by ID" });
};

const deleteMenteeById = (req, res) => {
  return res.json({ message: "deleting mentee by ID" });
};

module.exports = {
  getAllMentees,
  getMenteeById,
  updateMenteeById,
  deleteMenteeById,
};
