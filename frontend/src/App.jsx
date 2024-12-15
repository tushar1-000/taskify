import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import NavbarComp from "./components/NavbarComp";
import NotFoundPage from "./components/NotFoundPage";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import TaskList from "./components/TaskList";
import Register from "./page/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";

import Profile from "./page/Profile";
import Summary from "./components/Summary";

function App() {
  return (
    <>
      <NavbarComp />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<TaskList />} /> {/* Default view */}
          <Route path="summary" element={<Summary />} />
          <Route path="tasklist" element={<TaskList />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
