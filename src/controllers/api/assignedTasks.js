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
      success: true,
      message: "Task successfully assigned",
      assignedTask: assignedTask,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to assign task | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

module.exports = {
  assignTask,
};
