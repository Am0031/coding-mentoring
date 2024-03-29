const { Router } = require("express");

const router = Router();

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderInfoPage,
  renderContactPage,
  renderMentorSearch,
  renderFAQPage,
  renderResetPasswordPage,
} = require("../../controllers/views/public");

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/info", renderInfoPage);
router.get("/contact", renderContactPage);
router.get("/search/mentors", renderMentorSearch);
router.get("/faq", renderFAQPage);
router.get("/reset-password", renderResetPasswordPage);

module.exports = router;
