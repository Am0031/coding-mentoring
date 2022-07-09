const { Task, Framework } = require("../../models");

const getTasks = async (req, res) => {
  try {
    const temptasks = await Task.findAll({
      attributes: ["id", "taskName", "taskDescription", "taskLevel", "points"],
      include: Framework,
    });
    const tasks = temptasks.map((i) => i.dataValues);

    if (!tasks) {
      return res.status(500).json({ message: "Tasks not found" });
    }

    const formatTasks = (each) => {
      const id = each.id;
      const taskName = each.taskName;
      const taskDescription = each.taskDescription;
      const taskLevel = each.taskLevel;
      const points = each.points;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        frameworkId,
        frameworkName,
      };
      return response;
    };

    const formattedTasks = tasks.map(formatTasks);

    console.log(formattedTasks);

    const { framework, taskLevel } = req.body;

    const filteredTasks = formattedTasks
      .filter((item) => !taskLevel || item.taskLevel === taskLevel)
      .filter(
        (item) =>
          framework.length === 0 ||
          framework.some((element) => element === item.frameworkId)
      );

    return res.json(filteredTasks);

    // return formattedTasks;
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
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
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
