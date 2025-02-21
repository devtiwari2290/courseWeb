import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);

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
