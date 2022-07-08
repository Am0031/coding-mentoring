const { Router } = require("express");

const mentor = require("./mentors");
const mentee = require("./mentees");
const taskGroup = require("./task-group");
const frameWorks = require("./framework");

const router = Router();

router.use("/mentors", mentor);
router.use("/mentees", mentee);
router.use("/tasks", tasks);
router.use("/frameworks", frameWorks);
router.use("/assignedTasks", assignedTasks);

module.exports = router;
