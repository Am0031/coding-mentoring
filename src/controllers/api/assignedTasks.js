const { AssignedTask } = require("../../models");
const moment = require("moment");

const assignTask = async (req, res) => {
  try {
    const { partnershipId, taskId } = req.body;

    const taskDeadline = moment().add(14, "days").format("YYYY-MM-DD");

    const assignedTask = await AssignedTask.create({
      taskId,
      partnershipId,
      taskDeadline,
    });

    return res.json({
      message: "Task successfully assigned",
      assignedTask: assignedTask,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to assign task | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const updateAssignedTaskStatus = async (req, res) => {
  try {
    const { newStatus } = req.body;
    const { id } = req.params;

    const assignedTaskStatus = await AssignedTask.update(
      {
        taskComplete: newStatus,
      },
      { where: { id: id } }
    );

    return res.json({
      message: "Task status successfully updated",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to update task status | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

module.exports = {
  assignTask,
  updateAssignedTaskStatus,
};
