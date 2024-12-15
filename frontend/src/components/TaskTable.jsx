/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useState } from "react";
import EditModal from "./EditModal";
import { useDeleteTasksMutation } from "../slices/taskSlice";
import moment from "moment-timezone";

const TaskTable = ({ tasks, deleteHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [deleteTasksApi] = useDeleteTasksMutation();

  let [taskk, setTaskk] = useState(null);
  const openModal = (task) => {
    setTaskk(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskk(null);
    setIsModalOpen(false);
  };

  function pp(dateToBeChanged) {
    const ISTdate = moment
      .tz(dateToBeChanged, "UTC")
      .tz("Asia/Kolkata")
      .format("MMMM Do YYYY, h:mm:ss a");
    return ISTdate;
  }

  return (
    <div className="overflow-x-auto">
      {isModalOpen && (
        <EditModal
          taskk={taskk}
          closeModal={closeModal}
          isOpen={isModalOpen}
        ></EditModal>
      )}

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Select</th>
            <th className="px-4 py-2 border">Task ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Priority</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Start Time</th>
            <th className="px-4 py-2 border">End Time</th>
            <th className="px-4 py-2 border">Total Time (hrs)</th>
            <th className="px-4 py-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  onClick={() => deleteHandler(task._id)}
                />
              </td>
              <td className="px-4 py-2 border">{task._id}</td>
              <td className="px-4 py-2 border">{task.title}</td>
              <td className="px-4 py-2 border">{task.priority}</td>
              <td className="px-4 py-2 border">{task.status}</td>
              <td className="px-4 py-2 border">{pp(task.startTime)}</td>
              <td className="px-4 py-2 border">{pp(task.endTime)}</td>
              <td className="px-4 py-2 border">{task.totalTimeToFinish}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => openModal(task)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
