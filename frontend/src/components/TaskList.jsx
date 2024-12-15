import { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import Modal from "./Modal";

import {
  useDeleteTasksMutation,
  useGetUserTaskQuery,
} from "../slices/taskSlice";

import { useFilterSortQuery } from "../slices/taskSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function TaskList() {
  console.log("compoent render...");

  let [priority, setPriority] = useState("");
  let [pendingStatus, setPendingStatus] = useState("");
  let [sortFilter, setSortFilter] = useState("");
  let { data: userData, isLoading: ll, isFetching } = useGetUserTaskQuery();

  const { data: filteredData, isLoading: isFilterLoading } = useFilterSortQuery(
    {
      priority,
      sortBy: sortFilter,
      status: pendingStatus,
    }
  );

  useEffect(() => {}, []);

  let [deleteArr, setDeleteArr] = useState([]);
  let [deleteTasksApi] = useDeleteTasksMutation();

  async function deleteBtnHandler() {
    if (!deleteArr.length) {
      toast.error("Select tasks to be deleted");
    } else {
      let dataObj = { deleteArr };
      await deleteTasksApi(dataObj).unwrap();
      setDeleteArr([]);
    }
  }

  function deleteHandler(id) {
    if (deleteArr.includes(id)) {
      // If yes, remove it from the array (uncheck)
      setDeleteArr(deleteArr.filter((item) => item !== id));
    } else {
      // If no, add it to the array (check)
      setDeleteArr([...deleteArr, id]);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  if (ll || isFilterLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="my-5">
      {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} />}
      <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>
      <div className="flex items-center justify-between  flex-col lg:flex-row lg:justify-between  lg:items-center p-5 ">
        {/* Left side */}
        <div className="flex space-x-4 mb-12">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={deleteBtnHandler}
          >
            Delete Selected
          </button>
        </div>

        {/* Right side */}
        <div className="flex  flex-col  lg:flex-row space-x-4 gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="null">Sort By</option>
            <option value="startTime:asc">Start Time: Asc</option>
            <option value="startTime:desc">Start Time: Desc</option>
            <option value="endTime:asc">End Time: Asc</option>
            <option value="endTime:desc">End Time: Desc</option>
            <option value="null">clear</option>
          </select>

          {/* Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="null">Priority</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option value="null">clear</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={pendingStatus}
            onChange={(e) => setPendingStatus(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="null">Status</option>
            <option value="pending">Pending</option>
            <option value="finished"> Finished</option>
            <option value="null">clear</option>
          </select>
        </div>
      </div>
      <div className="my-10">
        {!ll && (
          <TaskTable
            openModal={openModal}
            tasks={userData.tasks}
            isOpen={isModalOpen}
            closeModal={closeModal}
            deleteHandler={deleteHandler}
          />
        )}
      </div>
    </div>
  );
}

export default TaskList;
