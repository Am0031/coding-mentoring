const { Router } = require("express");
const {
  renderDashboard,
  renderTaskSearch,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskDetails,
  renderCreateTask,
  renderEditInfo,
} = require("../../controllers/views/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get("/search/tasks", renderTaskSearch);
router.get("/search/tasks/:id", renderTaskDetails);
router.get("/search/mentees", renderMenteeSearch);
router.get("/search/mentees/:id", renderMenteeProfile);
router.get("/tasks", renderCreateTask);
router.get("/editInfo", renderEditInfo);

module.exports = router;
