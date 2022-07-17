const { Router } = require("express");

const router = Router();

const { assignTask } = require("../../controllers/api/assignedTasks");

router.post("/", assignTask);

module.exports = router;
