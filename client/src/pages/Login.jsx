import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/login.avif"; // Fixed import name conflict
import { FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // User Login
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  // useAuth Context
  const { storeTokenInLS } = useAuth();

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated login validation (add backend API call here)
    if (user.email === "" || user.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    // Clear the form
    setUser({ email: "", password: "" });
    console.log(user);
    LoginUser();
  };

  // Passing Login Data in Database
  const LoginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        storeTokenInLS(response.data.token);
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message;
      }

      toast.error(errorMessage); // Ensure toast fires
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly items-center w-full min-h-screen md:h-[90vh] px-5 pt-26 pb-10 md:pb-0 md:px-10 md:pt-20 gap-10">
        {/* Image Section */}
        <img
          src={LoginImage}
          alt="Login"
          className="h-80 w-80 md:h-100 md:w-96 rounded-2xl shadow-md shadow-black"
        />

        {/* Form Section */}
        <div className="flex flex-col gap-1 w-full max-w-md rounded-xl ">
          <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
            Welcome Back!
          </h1>
          <p className="text-lg md:text-xl text-center md:text-left">
            Please login to your account
          </p>
          <form
            action="/login"
            method="post"
            className="mt-3 p-3 md:p-0  rounded-xl"
            onSubmit={handleSubmit}
          >
            {/* Input Fields */}
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-1 mt-5 ">
              <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#5766FF]">
                  {" "}
                  {/* Fixed link */}
                  Sign Up
                </Link>
              </p>
              <button
                type="submit"
                className="bg-[#5766FF] text-white rounded-md px-5 py-2 mt-2 text-sm md:text-base"
              >
                Login
              </button>
            </div>

            {/* Alternative Sign-In Methods */}
            <div className="mt-10 lg:mt-10">
              <h1 className="text-sm font-semibold text-black text-center">
                Sign In with More Methods
              </h1>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-3 md:mt-3">
                <button className="border border-dashed border-gray-300 p-4 rounded-lg flex justify-center">
                  <FaFacebook size={30} className="text-blue-600" />
                </button>
                <button className="border border-dashed border-gray-300 p-4 rounded-lg flex justify-center">
                  <FaWhatsapp size={30} className="text-green-600" />
                </button>
                <button className="border border-dashed border-gray-300 p-4 rounded-lg flex justify-center">
                  <FaLinkedin size={30} className="text-blue-500" />
                </button>
                <button className="border border-dashed border-gray-300 p-4 rounded-lg flex justify-center">
                  <CiMail size={30} className="text-red-600" />
                </button>
                <button className="border border-dashed border-gray-300 p-4 rounded-lg flex justify-center">
                  <FaTwitter size={30} className="text-sky-500" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
