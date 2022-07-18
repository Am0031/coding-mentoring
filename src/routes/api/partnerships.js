const { Router } = require("express");

const router = Router();

const {
  createPartnership,
  getPartnershipsByMenteeId,
} = require("../../controllers/api/partnerships");

router.post("/", createPartnership);
router.get("/mentee", getPartnershipsByMenteeId);

module.exports = router;
