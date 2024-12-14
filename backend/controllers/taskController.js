import asynHandler from "express-async-handler";
import Task from "../models/taskModel.js";

/*
desc    Add task
route   POST  /api/tasks/
access  Private
*/
const addTask = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Task added" });
});

/*
desc    Get single task
route   GET  /api/tasks/:taskID
access  Private
*/
const getSingleTask = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Single task" });
});

/*
desc    Get all task
route   GET  /api/tasks/
access  Private
*/
const getAllTask = asynHandler(async (req, res) => {
  const task = await Task.find({});

  return res.status(200).json({ message: "All tasks", task: task });
});

/*
desc    Update single task
route   PUT  /api/tasks/:taskID
access  Private
*/
const updateTask = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Update task" });
});

/*
desc    Delete single task
route   DELETE  /api/tasks/:taskID
access  Private
*/
const deleteTask = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Task deleted" });
});

export { addTask, getAllTask, getSingleTask, updateTask, deleteTask };
