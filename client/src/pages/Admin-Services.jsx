import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseImage from "../assets/course.jpg"; // Ensure this path is correct

const AdminServices = () => {
  const { authorizationToken, services, API } = useAuth();

  const getAllServices = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/services`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      if (!response.data.services || response.data.services.length === 0) {
        toast.error("No services found");
      } else if (response.status === 200) {
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
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-7">
        {services && services.length > 0 ? (
          services.map((currElem, index) => {
            const { id, name, description, category, price, duration } =
              currElem;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
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
                    <span className="font-semibold">Duration:</span> {duration}
                  </p>
                  <div className="flex justify-between mt-4">
                    <Link to={`/admin/services/edit/${id}`}>
                      <button
                        type="button"
                        className="font-medium px-6 py-1 text-white rounded-md bg-green-600 hover:underline "
                      >
                        Edit
                      </button>
                    </Link>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
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
