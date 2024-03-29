const { AssignedTask, Partnership } = require("../../models");

const moment = require("moment");

const assignTask = async (req, res) => {
  try {
    const { taskId, menteeId } = req.body;

    const partnership = await Partnership.findOne({
      where: { mentorId: req.session.user.id, menteeId: menteeId },
    });

    const partnershipId = partnership.id;

    const taskDeadline = moment().add(14, "days").format("YYYY-MM-DD");

    const existingTask = await AssignedTask.findOne({
      where: { taskId: taskId, partnershipId: partnershipId },
    });

    if (!existingTask) {
      const assignedTask = await AssignedTask.create({
        taskId,
        partnershipId,
        taskDeadline,
      });

      return res.json({
        success: true,
        message: "Task successfully assigned",
        assignedTask: assignedTask,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Task already assigned to this mentee",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: `[ERROR]: Failed to assign task | ${error.message}`,
      });
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
      assignedTaskStatus: assignedTaskStatus,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: `[ERROR]: Failed to update task status | ${error.message}`,
      });
  }
};

module.exports = {
  assignTask,
  updateAssignedTaskStatus,
};
