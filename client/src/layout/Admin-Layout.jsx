import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdContacts, MdDesignServices } from "react-icons/md";
import { RiFunctionAddFill } from "react-icons/ri";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading Check
  if (isLoading || showLoader) {
    return (
      <div className="w-full min-h-screen mx-auto flex flex-col md:flex-row justify-center items-center pb-10 px-1 md:px-10 pt-24 sm:pt-24 md:pt-10">
        {/* Loader Section */}
        <button
          disabled
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  // Authorization Check
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full min-h-screen pb-10 px-1 md:px-10 pt-24 sm:pt-24 md:pt-28">
      <h2 className="menu-link text-2xl md:text-5xl text-[#5766FF] text-center font-bold">
        Welcome to Admin Panel
      </h2>

      {/* Admin Panel Container */}
      <div className="w-full max-w-6xl mx-auto bg-black rounded-lg shadow-lg p-5 mt-5 md:mt-7">
        {/* Responsive Admin Navigation */}
        <div className="flex flex-col md:flex-row gap-5">
          <nav className="w-full md:w-1/4 bg-gray-900 p-4 rounded-lg">
            <ul className="menu-link flex flex-col gap-4">
              {/* Dashboard */}
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-white tracking-wide font-semibold p-2 rounded-lg hover:bg-gray-700 transition-all"
                  style={(e) => ({ color: e.isActive ? "yellow" : "white" })}
                >
                  <MdDashboard className="text-yellow-500" />
                  Dashboard
                </NavLink>
              </li>

              {/* Users */}
              <li>
                <NavLink
                  to="/admin/users"
                  className="flex items-center gap-2 text-white tracking-wide font-semibold p-2 rounded-lg hover:bg-gray-700 transition-all"
                  style={(e) => ({ color: e.isActive ? "yellow" : "white" })}
                >
                  <FaUser className="text-purple-500" /> Users
                </NavLink>
              </li>
              {/* Contacts */}
              <li>
                <NavLink
                  to="/admin/contacts"
                  className="flex items-center gap-2 text-white tracking-wide font-semibold p-2 rounded-lg hover:bg-gray-700 transition-all"
                  style={(e) => ({ color: e.isActive ? "yellow" : "white" })}
                >
                  <MdContacts className="text-blue-500" /> Contacts
                </NavLink>
              </li>

              {/* Services */}
              <li>
                <NavLink
                  to="/admin/services"
                  className="flex items-center gap-2 text-white tracking-wide font-semibold p-2 rounded-lg hover:bg-gray-700 transition-all"
                  style={(e) => ({ color: e.isActive ? "yellow" : "white" })}
                >
                  <MdDesignServices className="text-pink-500" /> Services
                </NavLink>
              </li>
              {/* Home */}
              <li>
                <NavLink
                  to="/"
                  className="flex items-center gap-3 text-white tracking-wide font-semibold p-2 rounded-lg hover:bg-gray-700 transition-all"
                  style={(e) => ({ color: e.isActive ? "yellow" : "white" })}
                >
                  <IoHome className="text-green-500" /> Home
                </NavLink>
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
