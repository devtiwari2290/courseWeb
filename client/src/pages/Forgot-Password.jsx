import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotBoy from "../assets/angryboy.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { API } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await forgotPassword(email);
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${API}/api/auth/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Debugging line

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message || "OTP sent successfully!");
        setEmail("");
        setMessage(true); // Set message to true before navigating

        // Delay navigation for 2 seconds to show the message
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-10 px-4 md:px-8 lg:px-16 pt-20 md:pt-28">
      <div className="w-full max-w-4xl mx-auto p-6">
        <img
          src={ForgotBoy}
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
          alt="Forgot Password"
        />
        <h2 className="menu-link text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          Forgot Password?
        </h2>
        <p className="about text-md sm:text-lg md:text-xl font-medium text-center mb-4">
          Enter the email address <br /> associated with your account
        </p>
        <p className="about text-md sm:text-lg text-gray-500 md:text-lg font-medium text-center">
          We will send you a link to <br /> reset your password
        </p>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="about text-sm sm:text-base md:text-lg font-medium text-center"
            >
              Enter your registered email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="about max-w-2xl mx-auto px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 "
              aria-label="Email Address"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`max-w-2xl mx-auto px-4 py-2 tracking-wide text-white rounded-md bg-red-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
            }`}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
          {message ? (
            <p className="about text-sm sm:text-base md:text-lg text-green-600 font-medium text-center">
              OTP has been sent to your email
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
