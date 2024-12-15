/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUpdateTaskMutation } from "../slices/taskSlice";
import { toast } from "react-toastify";

const EditModal = ({ isOpen, closeModal, taskk }) => {

  const [updateTaskApi] = useUpdateTaskMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler(data, e) {
    e.preventDefault();
    let { title, status, startTime, endTime, priority } = data;
    startTime = new Date(data.startTime); // Local date input
    startTime = startTime.toISOString(); // Converts to UTC
    endTime = new Date(data.endTime);
    endTime = endTime.toISOString();

    try {
      let res = await updateTaskApi({
        title,
        status,
        startTime,
        endTime,
        priority,
        timeZone: "Asia/Kolkata",
        taskID: taskk._id,
      }).unwrap();
      reset();
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleCancel = () => {
    reset();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Task</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-s font-medium mb-1">
              Title
            </label>
            <input
              defaultValue={taskk.title}
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <div className="py-2">
                <span className=" text-red-500">*{errors.title.message}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-10">
            {/* Status Dropdown */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-s font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                defaultValue={taskk.status}
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                <option value="pending">Pending</option>
                <option value="finished">Finished</option>
              </select>
            </div>

            {/* {priority selector} */}
            <div>
              <label
                htmlFor="priority"
                className="block text-s font-medium mb-1"
              >
                Select Priority
              </label>
              <select
                id="priority"
                defaultValue={taskk.priority}
                {...register("priority", { required: "priority is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          {/* {watchedValue == "finished"
            ? <p className="text-yellow-600 my-2">Endtime will be current date& time</p> 
            : ""} */}
          {/* Date row */}
          <div className="flex  items-center gap-20 mb-8">
            {/* startTime */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <Controller
                name="startTime"
                control={control}
                defaultValue={taskk.startTime ? new Date(taskk.startTime) : ""}
                rules={{ required: "Start Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    autoComplete="off"
                    selected={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    ref={(ref) => {
                      field.ref(ref?.input); // `.input` is the actual DOM node in react-datepicker
                    }}
                  />
                )}
              />
              {errors.startTime && (
                <div className="py-2">
                  <span className=" text-red-500">
                    *{errors.startTime.message}
                  </span>
                </div>
              )}
            </div>
            {/* endTime */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <Controller
                name="endTime"
                control={control}
                defaultValue={new Date(taskk.endTime)}
                rules={{ required: "End Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    autoComplete="off"
                    selected={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    className="w-64  px-4 py-2 border border-gray-300 rounded-md"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    ref={(ref) => {
                      field.ref(ref?.input); // `.input` is the actual DOM node in react-datepicker
                    }}
                  />
                )}
              />
              {errors.endTime && (
                <div className="py-2">
                  <span className=" text-red-500">
                    *{errors.endTime.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
