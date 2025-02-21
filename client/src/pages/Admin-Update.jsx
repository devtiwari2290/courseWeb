import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    contact: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // Fetch Single User Data
  const getSingleUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/users/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200 && response.data?.singleUser) {
        setData(response.data.singleUser);
        toast.success("User data fetched successfully");
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user details");
    }
  };

  useEffect(() => {
    if (params.id) getSingleUserData();
  }, [params.id, authorizationToken]);

  // Update User Data
  const updateUser = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Ensure only necessary fields are sent
    const updatedData = {
      username: data.username,
      email: data.email,
      contact: data.contact,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/users/update/${params.id}`,
        updatedData, // Send only necessary fields
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "User updated successfully");
        console.log("User Updated Successfully", response.data);
        navigate("/admin/users");
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error in updating user details");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
      <div className="flex flex-col gap-1 w-full max-w-md">
        <h1 className="menu-link text-4xl md:text-6xl text-red-600 font-bold text-center md:text-left">
          Hi there!
        </h1>
        <p className="menu-link text-lg md:text-xl text-white text-center md:text-left">
          Let's update your profile
        </p>
        <form className="mt-3 p-3 md:p-0" onSubmit={updateUser}>
          <div className="about flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm text-white md:text-base"
              >
                Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                id="username"
                value={data?.username || ""}
                required
                autoComplete="off"
                autoFocus
                onChange={handleInput}
                className="border text-white border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-white md:text-base"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={data?.email || ""}
                required
                autoComplete="off"
                onChange={handleInput}
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact"
                className="text-sm text-white md:text-base"
              >
                Contact
              </label>
              <input
                type="number"
                name="contact"
                id="contact"
                placeholder="Enter your contact number"
                value={data?.contact || ""}
                required
                autoComplete="off"
                onChange={handleInput}
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="menu-link flex flex-col gap-1 mt-3">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md px-5 py-2 mt-2 text-sm md:text-base"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
