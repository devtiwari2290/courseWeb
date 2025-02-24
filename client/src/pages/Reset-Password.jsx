import React, { useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HappyBoy from "../assets/happyboy.jpg";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { API } = useAuth();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !otp || !newPassword) {
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API}/api/auth/reset-password`,
        { email, otp: String(otp), newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Password reset successfully!");
        setMessage("Password reset successfully!"); // Set success message

        // Delay navigation for 2 seconds to show the message
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data);
      toast.error(
        error.response?.data?.message ||
          "OTP is missing or expired. Please request a new OTP."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-10 px-4 md:px-8 lg:px-16 pt-20 md:pt-28">
      <div className="w-full max-w-4xl mx-auto p-6">
        <img
          src={HappyBoy}
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
          alt="Forgot Password"
        />
        <h2 className="menu-link text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          Verify Your OTP
        </h2>
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 mt-4"
        >
          <input
            type="text"
            required
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.toString())}
            maxLength={6}
            className="about max-w-2xl mx-auto px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            aria-label="Enter OTP"
            autoFocus
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="about max-w-2xl mx-auto px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            aria-label="Email Address"
          />
          <input
            type="password"
            required
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="about max-w-2xl mx-auto px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            aria-label="New Password"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`max-w-2xl mx-auto px-4 py-2 tracking-wide text-white rounded-md bg-green-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
          {message ? (
            <p className="about text-sm sm:text-base md:text-lg text-green-600 font-medium text-center">
              Password reset successfully!
            </p>
          ) : null}
        </form>
        <div className="flex justify-center mt-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm sm:text-base md:text-lg"
          >
            Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
