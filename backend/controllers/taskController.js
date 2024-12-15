import asynHandler from "express-async-handler";
import Task from "../models/taskModel.js";

/*
desc    Add task
route   POST  /api/tasks/
access  Private
*/
const addTask = asynHandler(async (req, res, next) => {
  const { title, startTime, endTime, status, priority, timeZone } = req.body;

  const diff = new Date(endTime) - new Date(startTime);
  const durationInSeconds = diff / 1000;
  const durationInMinutes = durationInSeconds / 60;
  const durationInHours = durationInMinutes / 60;

  try {
    const task = await Task.create({
      title,
      priority,
      startTime,
      endTime,
      status,
      userId: req.user._id,
      totalTimeToFinish: durationInHours,
    });
    res.status(201).send(task);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

/*
desc    Get single task
route   GET  /api/tasks/:taskID
access  Private
*/
const getSingleTask = asynHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskID);
  if (task.userId == req.user._id.toString()) {
    res.status(200).send(task);
  } else {
    res.status(401).send("Not authroized");
  }
});

/*
desc    Get all task
route   GET  /api/tasks/
access  Private
*/
const getAllTask = asynHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  return res.status(200).json({ count: tasks.length, tasks });
});

/*
desc    Update single task
route   PUT  /api/tasks/:taskID
access  Private
*/
const updateTask = asynHandler(async (req, res) => {
  const { taskID } = req.params;
  let { title, startTime, endTime, status, priority } = req.body;

  if (status == "finished") {
    endTime = new Date().toISOString();
  }

  const diff = new Date(endTime) - new Date(startTime);
  const durationInSeconds = diff / 1000;
  const durationInMinutes = durationInSeconds / 60;
  const durationInHours = durationInMinutes / 60;

  // Find the task and update it
  const updatedTask = await Task.findByIdAndUpdate(
    taskID,
    {
      title,
      startTime,
      endTime,
      priority,
      status,
      totalTimeToFinish: durationInHours,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // Check if task exists
  if (!updatedTask) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json(updatedTask);
});

/*
desc    Sort using priority and status
route   GET  /api/tasks/filter
access  Private
*/

const getFilteredAndSortedTasks = asynHandler(async (req, res) => {
  console.log("got request", req.query);

  if (!req.user) {
    throw new Error("User not present");
  }

  let { priority, status, sortBy } = req.query;
  let filter = {
    userId: req.user._id.toString(),
  };
  priority = parseInt(priority);
  // Filter by priority if provided
  if (priority && priority >= 1 && priority <= 5) {
    filter.priority = priority;
  }

  // Filter by status if provided

  if (status.length !== 0 && status !== 'null') {
    console.log(status);
    
    filter.status = status;
  }
  let sortOption = {};

  if (sortBy) {
    switch (sortBy) {
      case "startTime:asc":
        sortOption.startTime = 1; // Sort by startTime in ascending order
        break;
      case "startTime:desc":
        sortOption.startTime = -1; // Sort by startTime in descending order
        break;
      case "endTime:asc":
        sortOption.endTime = 1; // Sort by endTime in ascending order
        break;
      case "endTime:desc":
        sortOption.endTime = -1; // Sort by endTime in descending order
        break;
      default:
        break;
    }
  }
console.log('filterObj' , filter);

  let tasks = await Task.find(filter).sort(sortOption);

  res.status(200).json(tasks); // Send the filtered and sorted tasks
});

/*
desc    Delete single task
route   DELETE  /api/tasks/:taskID
access  Private
*/
const deleteTask = asynHandler(async (req, res) => {
  let { deleteArr } = req.body;

  const result = await Task.deleteMany({ _id: { $in: deleteArr } });
  console.log(result);

  if (!result) {
    throw new Erro("Invalid taskID");
  }
  return res.status(200).json({ message: "deleted", result });
});

export {
  addTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  getFilteredAndSortedTasks,
};
