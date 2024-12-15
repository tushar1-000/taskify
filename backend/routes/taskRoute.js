import express from "express";
import {
  addTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  getFilteredAndSortedTasks,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addTask);
router.get("/filter", protect, getFilteredAndSortedTasks);

router.get("/:taskID", protect, getSingleTask);
router.get("/", protect, getAllTask);
router.put("/:taskID", protect, updateTask);
router.delete("/deleteTasks", protect, deleteTask);

export default router;
