import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

function NavbarComp() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  async function logoutHandler() {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="bg-blue-500 p-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-10">
          {/* Logo */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white z-30"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {/* Logo for desktop */}
          <Link to="/">
            <div className="flex-shrink-0 text-white text-xl">Taskify</div>
          </Link>
          {/* Desktop Menu */}
          {!userInfo ? (
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium hidden md:block"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium hidden md:block"
              >
                profile
              </Link>
              <Link
                to="/logout"
                onClick={logoutHandler}
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium hidden md:block"
              >
                logout
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:hidden absolute inset-x-0 top-0 transform transition-transform bg-blue-500 p-4`}
        id="mobile-menu"
      >
        {!userInfo ? (
          <div className="space-y-4">
            <Link
              to="/login"
              className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
            >
              profile
            </Link>

            <Link
              to="/register"
              className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarComp;
