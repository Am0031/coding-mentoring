const { Router } = require("express");

const mentors = require("./mentors");
const mentees = require("./mentees");
const tasks = require("./tasks");
const frameworks = require("./frameworks");
const partnerships = require("./partnerships");
const assignedTasks = require("./assignedTasks");

const router = Router();

router.use("/mentors", mentors);
router.use("/mentees", mentees);
router.use("/tasks", tasks);
router.use("/frameworks", frameworks);
router.use("/partnerships", partnerships);
router.use("/assign", assignedTasks);

module.exports = router;
