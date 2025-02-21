import React from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseImage from "../assets/course.jpg"; // Ensure this path is correct

const AdminServices = () => {
  // Authorization Check
  const { authorizationToken, services, API } = useAuth();

  // Get All Services
  const getAllServices = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/services`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      // Check if services exist
      if (!response.data.services || response.data.services.length === 0) {
        toast.error("No services found");
      } else if (response.status === 200) {
        console.log("Admin Services:", response.data.services);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
      <h2 className="about text-2xl md:text-2xl text-center text-white font-bold">
        Admin Services Data
      </h2>
      {/* Admin Services */}
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-7 ">
        {services && services.length > 0 ? (
          services.map((currElem, index) => {
            const { name, description, category, price, duration } = currElem;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg  overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={CourseImage}
                  className="w-full h-52 object-cover"
                  alt="Course"
                />
                <div className="menu-link p-5">
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

export default AdminServices;
