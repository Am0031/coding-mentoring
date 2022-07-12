const { Router } = require("express");

const router = Router();

const {
  getMentors,
  getMentorById,
  updateMentorById,
  deleteMentorById,
  getMentorData,
} = require("../../controllers/api/mentors");

router.post("/", getMentors);
router.get("/:id", getMentorById);
router.get("/data/:id", getMentorData);
router.put("/:id", updateMentorById);
router.delete("/:id", deleteMentorById);

module.exports = router;
