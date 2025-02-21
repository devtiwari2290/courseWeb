import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import signup from "../assets/register.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // User Registration
  const [user, setUser] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  // useAuth Context
  const { storeTokenInLS, API } = useAuth();

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ username: "", email: "", contact: "", password: "" });
    RegisterUser();
  };

  // Register User Data in Database
  const RegisterUser = async () => {
    try {
      const response = await axios.post(
        `${API}/api/auth/register`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
          contact: user.contact,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        storeTokenInLS(response.data.token);
        toast.success(response.data.message);
        navigate("/login");
        console.log(response.data);
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with an error
        const errorMessage =
          error.response.data.extraDetails || error.response.data.message;
        toast.error(errorMessage);
        console.log("Error:", errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly items-center w-full min-h-screen md:h-[90vh] px-5 pt-26 pb-10 md:pb-0 md:px-10 md:pt-20 gap-10">
        {/* Image Section */}
        <img
          src={signup}
          alt="Register"
          className="h-80 w-80 md:h-100 md:w-96 rounded-2xl shadow-md shadow-black"
        />

        {/* Form Section */}
        <div className="flex flex-col gap-1 w-full max-w-md">
          <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
            Hi there!
          </h1>
          <p className="text-lg md:text-xl text-center md:text-left">
            Welcome to CourseCo Community
          </p>
          <form
            action="/register"
            method="post"
            className="mt-3 p-3 md:p-0"
            onSubmit={handleSubmit}
          >
            {/* Input Fields */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm md:text-base">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  id="username"
                  value={user.username}
                  required
                  autoComplete="off"
                  autoFocus
                  onChange={handleInput}
                  className="border border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm md:text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={user.email}
                  required
                  autoComplete="off"
                  onChange={handleInput}
                  className="border border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="contact" className="text-sm md:text-base">
                  Contact
                </label>
                <input
                  type="number"
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={user.contact}
                  required
                  autoComplete="off"
                  onChange={handleInput}
                  className="border border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm md:text-base">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={user.password}
                  required
                  autoComplete="off"
                  onChange={handleInput}
                  className="border border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-1 mt-3">
              <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
                Already have an account?{" "}
                <Link to="/login" className="text-[#5766FF]">
                  Login
                </Link>
              </p>
              <button
                type="submit"
                className="bg-[#5766FF] text-white rounded-md px-5 py-2 mt-2 text-sm md:text-base"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
