import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddService = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    price: "",
  });

  // Handle Sumbit Form
  const handleSumbit = (e) => {
    e.preventDefault();
    const [name, value] = e.target.value;
    setService({ ...service, [name]: value });
    addService(); // Call addService
  };

  const { API, authorizationToken } = useAuth();
  const navigate = useNavigate();

  // Add Service
  const addService = async () => {
    try {
      const response = await axios.post(
        `${API}/api/data/add-service`,
        service,
        {
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Service added successfully");
        navigate("/admin/services");
        setService({
          name: "",
          description: "",
          category: "",
          duration: "",
          price: "",
        });
      } else {
        toast.error(response.data.message || "Failed to add service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
      <div className="flex flex-col gap-1 w-full max-w-md">
        <h1 className="menu-link text-4xl md:text-6xl text-red-600 font-bold text-center md:text-left">
          Hi there!
        </h1>
        <p className="menu-link text-lg md:text-xl text-white text-center md:text-left">
          Let's add a new service
        </p>
        <form
          action="/add-service"
          method="post"
          className="mt-3 p-3 md:p-0"
          onSubmit={handleSumbit}
        >
          <div className="about flex flex-col gap-2">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm text-white md:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter service name"
                id="name"
                value={service.name}
                onChange={(e) =>
                  setService({ ...service, name: e.target.value })
                }
                required
                autoComplete="off"
                autoFocus
                className="border text-white border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-sm text-white md:text-base"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={service.description}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
                placeholder="Enter service description"
                required
                autoComplete="off"
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            {/* Category */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-sm text-white md:text-base"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={service.category}
                onChange={(e) =>
                  setService({ ...service, category: e.target.value })
                }
                placeholder="Enter service category"
                required
                autoComplete="off"
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            {/* Duration */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="duration"
                className="text-sm text-white md:text-base"
              >
                Duration
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                value={service.duration}
                onChange={(e) =>
                  setService({ ...service, duration: e.target.value })
                }
                placeholder="Enter service duration"
                required
                autoComplete="off"
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price"
                className="text-sm text-white md:text-base"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: e.target.value })
                }
                placeholder="Enter service price"
                required
                autoComplete="off"
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
          </div>
          {/* Add Service Button */}
          <div className="menu-link flex flex-col gap-1 mt-3">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md px-5 py-2 mt-2 text-sm md:text-base"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
