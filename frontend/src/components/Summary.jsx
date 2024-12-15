function Summary() {
  const totalTasks = 50; // Example data
  const completedTasks = 40; // Example data
  const pendingTasks = totalTasks - completedTasks;
  const avgHoursPerTask = 2.5; // Example data

  // Calculate completion percentage
  const completionPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mb-10">
        {/* Total Tasks Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Tasks</h2>
          <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
        </div>

        {/* Task Completed Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Task Completed
          </h2>
          <p className="text-2xl font-bold text-green-600">{completedTasks}%</p>
          
        </div>

        {/* Task Pending Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Task Pending</h2>
          <p className="text-2xl font-bold text-red-600">{pendingTasks}%</p>
        </div>

        {/* Average Hour per Task Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Avg Hours per Task
          </h2>
          <p className="text-2xl font-bold text-indigo-600">
            {avgHoursPerTask} hrs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mb-10">
        {/* pending task Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending task</h2>
          <p className="text-2xl font-bold text-red-600">45</p>
        </div>
        {/* Total Time Elapsed */}

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Time elapsed
          </h2>
          <p className="text-2xl font-bold text-blue-600">{22}</p>
        </div>
        {/* {total estimated time} */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Estimated Time
          </h2>
          <p className="text-2xl font-bold text-indigo-600">{23} hrs</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
