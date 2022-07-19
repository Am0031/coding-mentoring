const { Router } = require("express");

const router = Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTasksByMentor,
} = require("../../controllers/api/tasks");

router.post("/", getTasks);
router.get("/mentor", getTasksByMentor);
router.get("/:id", getTaskById);
router.post("/create", createTask);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;
