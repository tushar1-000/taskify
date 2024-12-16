import {  NavLink, Outlet } from "react-router-dom";


function Dashboard() {

  return (
    <div className="container p-4">
      <div className="max-w-60 ">
        {/* Links */}
        <div className="flex justify-between items-center">
          <NavLink to="/dashboard/summary" className="hover:text-blue-400">
            <div className="shadow-sm p-4 bg-white rounded-lg">Summary</div>
          </NavLink>
          <NavLink to="/dashboard/tasklist" className="hover:text-blue-400">
            <div className="shadow-sm p-4 bg-white rounded-lg">Task List</div>
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
