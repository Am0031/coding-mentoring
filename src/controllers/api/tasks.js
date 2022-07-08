const { Task } = require("../../models");

const getAllTasks = (req, res) => {
  return res.json({ message: "getting all tasks" });
};

const getTaskById = (req, res) => {
  return res.json({ message: "getting task by ID" });
};

const createTask = (req, res) => {
  return res.json({ message: "creating task" });
};

const updateTaskById = (req, res) => {
  return res.json({ message: "updating task by ID" });
};

const deleteTaskById = (req, res) => {
  return res.json({ message: "deleting task by ID" });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
