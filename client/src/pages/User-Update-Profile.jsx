import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UserUpdateProfile = () => {
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
        `http://localhost:3000/api/auth/user/profile/${params.id}`,
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

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: data.username,
      email: data.email,
      contact: data.contact,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/user/profile/update/${params.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        navigate("/user/profile");
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="about flex flex-col items-center justify-center min-h-screen px-4 md:px-10 lg:px-20  py-12 md:py-16 bg-gray-100 pt-26 sm:pt-32 md:pt-24">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="menu-link text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          Hi {data.username || "User"}!
        </h1>
        <p className="menu-link text-center text-gray-600 text-lg mb-6">
          Let's update your profile
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="about mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-gray-700 font-medium"
            >
              Contact
            </label>
            <input
              type="number"
              name="contact"
              id="contact"
              value={data.contact}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md text-lg font-medium hover:bg-green-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
