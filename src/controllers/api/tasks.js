const { Task, Framework, Mentor } = require("../../models");

const getTasks = async (req, res) => {
  try {
    const tempTasks = await Task.findAll({
      attributes: [
        "id",
        "taskName",
        "taskDescription",
        "taskLevel",
        "points",
        "resourceURL",
        "authorId",
      ],
      include: [{ model: Framework }, { model: Mentor }],
    });
    const tasks = tempTasks.map((i) => i.get({ plain: true }));

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
      const authorId = each.authorId;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const authorName = each.mentor?.username ?? "MentorMe";

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        authorId,
        frameworkId,
        frameworkName,
        authorName,
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
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const getTasksByMentor = async (req, res) => {
  try {
    const { id } = req.session.user;
    const temptasks = await Task.findAll({
      where: { authorId: id },
      attributes: [
        "id",
        "taskName",
        "taskDescription",
        "taskLevel",
        "points",
        "resourceURL",
        "authorId",
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
      const authorId = each.authorId;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        authorId,
        frameworkId,
        frameworkName,
      };
      return response;
    };

    const formattedTasks = tasks.map(formatTasks);

    return res.json(formattedTasks);
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
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
        "authorId",
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
      const authorId = each.authorId;
      const frameworkId = each.framework.id;
      const frameworkName = each.framework.frameworkName;

      const response = {
        id,
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        authorId,
        frameworkId,
        frameworkName,
      };
      return response;
    };

    const formattedTask = formatTask(task);
    return res.json(formattedTask);
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const createTask = async (req, res) => {
  try {
    const {
      taskName,
      taskDescription,
      taskLevel,
      frameworkId,
      points,
      resourceURL,
    } = req.body;
    const authorId = req.session.user.id;
    if (!taskName || !taskDescription || !taskLevel || !frameworkId) {
      return res.status(400).json({ message: "Unable to create task" });
    }

    let options;
    if (!resourceURL) {
      options = {
        taskName,
        taskDescription,
        taskLevel,
        points,
        frameworkId,
        authorId,
      };
    } else {
      options = {
        taskName,
        taskDescription,
        taskLevel,
        points,
        resourceURL,
        frameworkId,
        authorId,
      };
    }

    const newTask = await Task.create(options);

    return res.status(200).json({ message: "Task created", newTask: newTask });
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
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
    return res.status(500).json({ message: `ERROR | ${error.message}` });
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
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTasksByMentor,
};
