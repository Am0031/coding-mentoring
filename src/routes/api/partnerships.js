const { Router } = require("express");

const router = Router();

const {
  createPartnership,
  getPartnershipsByMenteeId,
} = require("../../controllers/api/partnerships");

// should this and line 15 be here or in mentees/elsewhere?
const assignedTasks = require("./assignedTasks");

router.post("/", createPartnership);
router.get("/mentee", getPartnershipsByMenteeId);
router.use("/:id/tasks", assignedTasks);

module.exports = router;
