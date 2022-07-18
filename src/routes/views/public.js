const { Router } = require("express");

const router = Router();

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderContactPage,
  renderMentorSearch,
  renderMentorProfile,
} = require("../../controllers/views/public");

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/info", renderInfoPage);
router.get("/contact", renderContactPage);
router.get("/search/mentors", renderMentorSearch);
router.get("/search/mentors/:id", renderMentorProfile);

module.exports = router;
