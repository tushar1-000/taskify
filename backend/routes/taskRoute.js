import express from "express";
import {
  addTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = express.Router();

router.post("/", addTask);
router.get("/:taskID", getSingleTask);
router.get("/", getAllTask);
router.put("/:taskID", updateTask);
router.delete("/:taskID", deleteTask);

export default router;
