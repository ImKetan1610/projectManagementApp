const express = require("express");
const {
  getUserTask,
  createTask,
  updateTaskStatus,
  deleteTask,
  getFilteredTask,
  filterByStatus,
  updateStatus,
  getTasksByPriority,
  dueDateTasks,
  getTaskById
} = require("../controllers/taskController");
const { protect } = require("../config/authMiddleware");
const router = express.Router();

router.get("/", protect, getUserTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

router.get("/filter", protect, getFilteredTask); // wrto duedate
// Filter tasks by status
router.get("/filterByStatus", filterByStatus);

// PUT route to update the task status
router.put("/:id/status", protect, updateStatus);

// get task by priority
router.get("/priority/:priority", protect, getTasksByPriority);

router.get("/dueDateTasks", protect, dueDateTasks);

// get task by id
router.get("/:id", getTaskById);

module.exports = router;
