import mongoose from "mongoose";
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: [true, "startTime is required"],
    },
    endTime: {
      type: Date,
      required: [true, "endTime is required"],
    },
    status: {
      type: String,
      enum: ["pending", "finished"],
      default: "pending",
    },
    priority: {
      type: Number,
      required: [true, "Priority is required"],
      enum: [1, 2, 3, 4, 5],
    },
    totalTimeToFinish: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
