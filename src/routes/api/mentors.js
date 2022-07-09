const { Router } = require("express");

const router = Router();

const {
  getMentors,
  getMentorById,
  updateMentorById,
  deleteMentorById,
} = require("../../controllers/api/mentors");

router.post("/", getMentors);
router.get("/:id", getMentorById);
router.put("/:id", updateMentorById);
router.delete("/:id", deleteMentorById);

module.exports = router;
