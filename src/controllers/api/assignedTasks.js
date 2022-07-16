const { AssignedTask } = require("../../models");

const assignTask = async (req, res) => {
  try {
    const { partnershipId, taskId } = req.body;

    const assignedTask = await AssignedTask.create({
      taskId,
      partnershipId,
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

module.exports = {
  assignTask,
};
