import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
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

  // Authorization token
  const { authorizationToken, API } = useAuth();

  // Get All Contacts
  const getAllContacts = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/contacts`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      //  Check if contacts exist
      if (!response.data.contacts || response.data.contacts.length === 0) {
        toast.error("No contacts found");
      } else if (response.status === 200) {
        setContactData(response.data.contacts);
        console.log("Admin Contacts:", response.data.contacts);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data);
        await getAllContacts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
      toast.error("Failed to delete contact. Please try again.");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-5 rounded-lg ">
      <h2 className="about text-2xl md:text-2xl text-center text-white font-bold">
        Admin Contacts Data
      </h2>
      {/* Admin Contacts */}
      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="menu-link text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((contact, index) => (
              <tr
                key={index}
                className="about bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contact.username}
                </th>
                <td className="px-6 py-4 text-center ">{contact.email}</td>
                <td className="px-6 py-4 text-center ">{contact.message}</td>
                {/* Delete Button */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteContact(contact._id)}
                    type="button"
                    className="font-medium px-6 py-1 bg-red-600 rounded-md text-white hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContacts;
