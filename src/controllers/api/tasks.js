const { Task, Framework } = require("../../models");

const getTasks = async (req, res) => {
  try {
    const temptasks = await Task.findAll({
      attributes: [
        "id",
        "taskName",
        "taskDescription",
        "taskLevel",
        "points",
        "resourceURL",
      ],
      include: [{ model: Framework }],
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
      const resourceURL = each.resourceURL;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        frameworkId,
        frameworkName,
      };
      return response;
    };

    const formattedTasks = tasks.map(formatTasks);

    const { framework, taskLevel } = req.body;

    const filteredTasks = formattedTasks
      .filter((item) => !taskLevel || item.taskLevel === taskLevel)
      .filter(
        (item) =>
          framework.length === 0 ||
          framework.some((element) => element === item.frameworkId)
      );

    return res.json(filteredTasks);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const temptask = await Task.findByPk(id, {
      attributes: [
        "id",
        "taskName",
        "taskDescription",
        "taskLevel",
        "points",
        "resourceURL",
      ],
      include: Framework,
    });
    const task = temptask.dataValues;

    if (!task) {
      return res.status(500).json({ message: "Task not found" });
    }

    const formatTask = (each) => {
      const id = each.id;
      const taskName = each.taskName;
      const taskDescription = each.taskDescription;
      const taskLevel = each.taskLevel;
      const points = each.points;
      const resourceURL = each.resourceURL;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        frameworkId,
        frameworkName,
      };
      return response;
    };

    const formattedTask = formatTask(task);
    return res.json(formattedTask);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { taskName, taskDescription, taskLevel, frameworkId } = req.body;

    if (!taskName || !taskDescription || !taskLevel || !frameworkId) {
      return res.status(400).json({ message: "Unable to create task" });
    }

    let { points } = req.body;
    if (!points) {
      points = 20;
    }
    // we could add the userId to a task model, so mentors can filter on that and choose to view only their tasks
    // const { id } = req.session.user;

    const newTask = await Task.create({
      taskName,
      taskDescription,
      taskLevel,
      points,
      frameworkId,
    });

    return res.status(200).json({ message: "Task created", newTask: newTask });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const passedInfo = req.body;
    if (!passedInfo) {
      return res.status(500).json({ message: "Unable to update task" });
    }

    await Task.update(passedInfo, { where: { id } });

    return res.status(200).json({ message: "Task updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.destroy({ where: { id } });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
