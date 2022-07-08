const { Mentee } = require("../../models");

const getAllMentees = (req, res) => {
  return res.json({ message: "getting all mentees" });
};

const getMenteeById = (req, res) => {
  return res.json({ message: "getting mentee by ID" });
};

const createMentee = (req, res) => {
  return res.json({ message: "creating mentee" });
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
  createMentee,
  updateMenteeById,
  deleteMenteeById,
};
