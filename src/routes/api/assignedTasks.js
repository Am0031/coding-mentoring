const { Router } = require("express");

const router = Router({ mergeParams: true });

const { assignTask } = require("../../controllers/api/assignedTasks");

router.post("/", assignTask);

module.exports = router;
