import React from "react";
import { Link } from "react-router-dom";
import ErrorImage from "../assets/ErrorPage.png";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-evenly items-center p-6 text-center md:text-left">
      {/* Text Section */}
      <div className="max-w-lg">
        <h2 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-bold leading-tight">
          404
        </h2>
        <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug">
          Something went <br />
          <span className="text-black text-3xl sm:text-4xl md:text-5xl uppercase font-bold">
            wrong!
          </span>
        </p>
        <Link to="/">
          <button className="button relative inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-blue-500 border border-black rounded-full overflow-hidden group mt-5">
            <span className="relative z-10 transition-colors text-black duration-300 group-hover:text-white">
              Back to Home
            </span>
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <img
        src={ErrorImage}
        className="w-40 sm:w-60 md:w-80 lg:w-96 mt-6 md:mt-0"
        alt="Error Page"
      />
    </div>
  );
};

export default NotFound;
