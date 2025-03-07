import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading Check
  if (isLoading || showLoader) {
    return (
      <div className="w-full min-h-screen mx-auto flex flex-col md:flex-row justify-center items-center pb-10 px-1 md:px-10 pt-24 sm:pt-24 md:pt-10">
        {/* Loader Section */}
        <button
          disabled
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  // Authorization Check
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  const [data, setData] = useState({
    username: "",
    email: "",
    contact: "",
  });

  const params = useParams();
  const { authorizationToken, API } = useAuth();

  // Fetch Single User Data
  const getSingleUserData = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/users/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200 && response.data?.singleUser) {
        setData(response.data.singleUser);
        toast.success("User data fetched successfully");
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user details");
    }
  };

  useEffect(() => {
    if (params.id) getSingleUserData();
  }, [params.id, authorizationToken]);

  // Update User Data
  const updateUser = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Ensure only necessary fields are sent
    const updatedData = {
      username: data.username,
      email: data.email,
      contact: data.contact,
    };

    try {
      const response = await axios.put(
        `${API}/api/admin/users/update/${params.id}`,
        updatedData, // Send only necessary fields
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "User updated successfully");
        console.log("User Updated Successfully", response.data);
        navigate("/admin/users");
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error in updating user details");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg">
      <div className="flex flex-col gap-1 w-full max-w-md">
        <h1 className="menu-link text-4xl md:text-6xl text-red-600 font-bold text-center md:text-left">
          Hi there!
        </h1>
        <p className="menu-link text-lg md:text-xl text-white text-center md:text-left">
          Let's update your profile
        </p>
        <form className="mt-3 p-3 md:p-0" onSubmit={updateUser}>
          <div className="about flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm text-white md:text-base"
              >
                Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                id="username"
                value={data?.username || ""}
                required
                autoComplete="off"
                autoFocus
                onChange={handleInput}
                className="border text-white border-gray-400 rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-white md:text-base"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={data?.email || ""}
                required
                autoComplete="off"
                onChange={handleInput}
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact"
                className="text-sm text-white md:text-base"
              >
                Contact
              </label>
              <input
                type="number"
                name="contact"
                id="contact"
                placeholder="Enter your contact number"
                value={data?.contact || ""}
                required
                autoComplete="off"
                onChange={handleInput}
                className="border border-gray-400 text-white rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="menu-link flex flex-col gap-1 mt-3">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md px-5 py-2 mt-2 text-sm md:text-base"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
