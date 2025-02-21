import React from "react";
import AdminImage from "../assets/AdminProfile.jpg";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const skills = [
  { image: "https://saarthack.github.io/portfolio/images/html-min.webp" },
  { image: "https://saarthack.github.io/portfolio/images/css-min.webp" },
  { image: "https://saarthack.github.io/portfolio/images/js-min.webp" },
  {
    image: "https://saarthack.github.io/portfolio/images/React-icon.svg.webp",
  },

  { image: "https://saarthack.github.io/portfolio/images/gsap-min.webp" },
  {
    image:
      "https://logowik.com/content/uploads/images/tailwind-css3232.logowik.com.webp",
  },

  { image: "https://nodejs.org/static/logos/jsIconGreen.svg" },
  { image: "https://saarthack.github.io/portfolio/images/mongodb-min.webp" },
];

const AdminDashBoard = () => {
  const { user } = useAuth();

  if (!user) {
    toast.error("Please login to access this page");
  }

  return (
    <div>
      {/* Admin Content */}
      <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
        {/* Admin Profile Section */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-7 mb-5 items-center sm:items-start">
          <img
            src={AdminImage}
            className="w-20 h-20 rounded-full"
            alt="Admin"
          />
          {/* Admin Details */}
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="navbar text-lg sm:text-2xl text-white font-semibold">
              {user?.username}
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Full Stack Developer | India
            </p>
            {/* Skills Tags */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              {["Frontend", "Backend", "Full Stack", "UI/UX"].map(
                (skill, index) => (
                  <div
                    key={index}
                    className={`w-20 h-8 flex justify-center items-center rounded-full ${
                      skill === "Frontend"
                        ? "bg-blue-500"
                        : skill === "Backend"
                        ? "bg-green-500"
                        : skill === "Full Stack"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  >
                    <h2 className="about text-sm font-semibold text-white">
                      {skill}
                    </h2>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Followers, Following & Students */}
        <div className="menu-link bg-gray-700 p-5 rounded-lg flex flex-wrap justify-center sm:justify-start gap-6 mt-2">
          {["100k Followers", "100 Following", "42k Students"].map(
            (info, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <h2 className="text-sm font-semibold text-gray-400">{info}</h2>
              </div>
            )
          )}
        </div>

        {/* Admin Skills Section */}
        <div className="about bg-gray-700 p-5 rounded-lg mt-5">
          <h2 className="tracking-wider text-lg sm:text-2xl text-white font-semibold tracking-wider">
            Full Stack Skills
          </h2>
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5
           mt-5"
          >
            {(user?.skills || skills).map((currElem, index) => (
              <div
                key={index}
                className="w-14 h-14 bg-white flex justify-center items-center rounded-lg"
              >
                <img
                  src={currElem.image || currElem}
                  className="w-12 h-12 object-contain"
                  alt="Skill Icon"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Admin About Section */}
        <div className="about bg-gray-700 p-5 rounded-lg mt-5">
          <h2 className="tracking-wider text-lg sm:text-2xl text-white font-semibold tracking-wider">
            About
          </h2>
          <p className="tracking-wider leading-relaxed text-sm sm:text-base text-gray-400 mt-2">
            I'm {user?.username}, a Full Stack Developer and a UI/UX designer. I
            specialize in building web applications and UI/UX design &
            animations. I have a passion for creating visually appealing and
            user-friendly websites. Proficient in Frontend technologies (HTML,
            CSS, JavaScript, Tailwind, React) and Backend technologies (NodeJS,
            ExpressJS, MongoDB).
          </p>
        </div>

        {/* Admin Contact Section */}
        <div className="about bg-gray-700 p-5 rounded-lg mt-5">
          <h2 className="tracking-wider text-lg sm:text-2xl text-white font-semibold tracking-wider">
            Contact
          </h2>
          <p className="tracking-wide text-sm sm:text-base text-gray-400 mt-2">
            Email: {user?.email}
          </p>
          <p className="tracking-wide text-sm sm:text-base text-gray-400">
            Contact: {user?.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
