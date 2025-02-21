import React from "react";
import { useAuth } from "../store/auth";
import CourseImage from "../assets/course.jpg"; // Ensure this path is correct

const Services = () => {
  const { services } = useAuth();

  return (
    <div className="services w-full min-h-screen flex flex-col items-center px-5 md:px-10 pt-16 md:pt-24 pb-10">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  px-3 md:px-0 max-w-5xl mt-10">
        {services && services.length > 0 ? (
          services.map((currElem, index) => {
            const { name, description, category, price, duration } = currElem;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg  overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={CourseImage}
                  className="w-full h-52 object-cover"
                  alt="Course"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{description}</p>
                  <p className="text-gray-700 font-normal">
                    <span className="font-semibold">Category:</span> {category}
                  </p>
                  <p className="text-gray-700 font-normal">
                    <span className="font-semibold">Price:</span> {price}
                  </p>
                  <p className="text-gray-700 font-normal">
                    <span className="font-semibold"> Duration:</span> {duration}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No services available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
