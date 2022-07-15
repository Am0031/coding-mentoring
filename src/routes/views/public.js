const { Router } = require("express");

const router = Router();

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderMentorSearch,
  renderMentorProfile,
  renderFAQPage,
} = require("../../controllers/views/public");

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/info", renderInfoPage);
router.get("/search/mentors", renderMentorSearch);
router.get("/search/mentors/:id", renderMentorProfile);
router.get("/faq", renderFAQPage);

module.exports = router;
