import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserImage from "../assets/UserProfile.avif";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { authorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/user", {
        headers: { Authorization: authorizationToken },
      });
      if (response.status === 200 && response.data?.userData) {
        setUserData(response.data.userData);
        toast.success("Welcome to your profile");
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-10 px-4 md:px-8 lg:px-16 pt-26 md:pt-28">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img src={UserImage} className="w-24 h-24 rounded-full" alt="User" />
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl text-white font-semibold">
              {userData?.username || "Guest User"}
            </h2>
            <p className="text-sm text-gray-400">
              Jhansi, Uttar Pradesh | India
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {["Programming Languages", "Frontend Skills", "Backend Skills"].map(
            (category, index) => (
              <div key={index}>
                <h3 className="text-base text-gray-400">{category}:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(category === "Programming Languages"
                    ? [
                        { name: "C,", color: "text-blue-500" },
                        { name: "C++,", color: "text-green-500" },
                        { name: "Java,", color: "text-purple-500" },
                        { name: "Python,", color: "text-pink-500" },
                        { name: "JavaScript", color: "text-orange-500" },
                      ]
                    : category === "Frontend Skills"
                    ? [
                        { name: "HTML,", color: "text-blue-500" },
                        { name: "CSS,", color: "text-green-500" },
                        { name: "JavaScript,", color: "text-purple-500" },
                        { name: "Tailwind,", color: "text-pink-500" },
                        { name: "React", color: "text-orange-500" },
                      ]
                    : [
                        { name: "NodeJS,", color: "text-blue-500" },
                        { name: "ExpressJS,", color: "text-green-500" },
                        { name: "MongoDB", color: "text-purple-500" },
                      ]
                  ).map((skill, i) => (
                    <span
                      key={i}
                      className={`text-sm font-semibold ${skill.color}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        <div className="bg-gray-700 p-5 rounded-lg mt-5">
          <h2 className="text-lg sm:text-xl text-white font-semibold">About</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            I'm {userData?.username || "a developer"}, a highly skilled
            Front-end Developer residing in Jhansi, Uttar Pradesh. I specialize
            in creating immersive and user-centric experiences on the web. With
            a strong foundation in HTML, CSS, and JavaScript, I have a deep
            understanding of the latest web technologies and frameworks, With a
            passion for problem-solving and a commitment to delivering
            exceptional results, I thrive in collaborative environments and
            thrive in the dynamic world of web development. Let's collaborate
            and bring your ideas to life!
          </p>
        </div>

        <div className="bg-gray-700 p-5 rounded-lg mt-5">
          <h2 className="text-lg sm:text-xl text-white font-semibold">
            Contact
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Email: {userData?.email || "Not Available"}
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            Contact: {userData?.contact || "Not Available"}
          </p>
        </div>

        {userData?._id ? (
          <div className="flex justify-center sm:justify-start mt-5">
            <Link to={`/user/profile/${userData._id}`}>
              <button className="px-6 py-3 tracking-wide text-white rounded-md bg-green-600 hover:bg-green-700">
                Edit Profile
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center sm:justify-start mt-5">
            <button
              className="px-6 py-3 text-white rounded-md bg-gray-500 cursor-not-allowed"
              disabled
            >
              Edit Profile (Not Available)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
