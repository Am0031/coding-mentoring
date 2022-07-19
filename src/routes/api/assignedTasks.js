const { Router } = require("express");

const router = Router({ mergeParams: true });

const {
  assignTask,
  updateAssignedTaskStatus,
} = require("../../controllers/api/assignedTasks");

router.post("/", assignTask);
router.put("/update/:id", updateAssignedTaskStatus);

module.exports = router;
