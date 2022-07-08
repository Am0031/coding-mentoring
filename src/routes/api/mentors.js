const { Router } = require("express");

const router = Router();

const {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentorById,
  deleteMentorById,
} = require("../../controllers/api/mentors");

router.get("/", getAllMentors);
router.get("/:id", getMentorById);
router.post("/", createMentor);
router.put("/:id", updateMentorById);
router.delete("/:id", deleteMentorById);

module.exports = router;
