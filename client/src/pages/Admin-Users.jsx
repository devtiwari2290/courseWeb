import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // Get Token
  const { authorizationToken } = useAuth();

  // Get All Users Data
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      // Check if users exist
      if (!response.data.users || response.data.users.length === 0) {
        toast.error("No users found");
      } else if (response.status === 200) {
        setUsers(response.data.users);
        console.log("Admin Users:", response.data.users);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/admin/users/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        await getAllUsers(); // Ensure users list updates after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
        <h2 className="about text-2xl md:text-2xl text-center text-white font-bold">
          Admin Users Data
        </h2>
        {/* Admin Users Table */}
        <div className="overflow-x-auto mt-5">
          <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="menu-link text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Update
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="about bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4  text-center ">{user.email}</td>
                  <td className="px-6 py-4  text-center ">{user.contact}</td>
                  {/* Update Button */}
                  <td className="px-6 py-4 text-center">
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <button
                        type="button"
                        className="font-medium px-6 py-1 text-white rounded-md bg-green-600 hover:underline "
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  {/* Delete Button */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="font-medium  px-6 py-1 bg-red-600 rounded-md text-white hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
