const { Router } = require("express");
const {
  renderDashboard,
  renderTaskSearch,
  renderMenteeSearch,
  renderMenteeProfile,
  renderTaskDetails,
} = require("../../controllers/views/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get("/tasks/search", renderTaskSearch);
router.get("/tasks/:id", renderTaskDetails);
router.get("/search/mentees", renderMenteeSearch);
router.get("/search/mentees/:id", renderMenteeProfile);

module.exports = router;
