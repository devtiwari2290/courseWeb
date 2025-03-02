import { useState } from "react";
import { IoIosChatbubbles } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  // Contact Section
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  // Contact User Details
  const [userData, setUserData] = useState(true);

  const { user, API } = useAuth();

  if (user && userData) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setContact({
      username: "",
      email: "",
      message: "",
    });
    console.log(contact);
    ContactData();
  };

  // Sending Contact Data to Database
  const ContactData = async () => {
    try {
      const response = await axios.post(
        `${API}/api/form/contact`,
        {
          username: contact.username,
          email: contact.email,
          message: contact.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        console.log("Message Sent Successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle both API response errors and network errors
      if (error.response) {
        // Extract message from server response
        const errorMessage = error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message;

        toast.error(errorMessage); // Show error message
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="services w-full min-h-screen flex flex-col md:flex-row justify-evenly gap-10 pb-10 px-5 md:px-10 pt-22 sm:pt-24 md:pt-28">
        {/* Contact Section Part-1 */}
        <div className="max-w-md w-full p-5 md:p-10 flex flex-col gap-8">
          {/* Chat to Us */}
          <Link className="flex justify-start items-center gap-3">
            <IoIosChatbubbles size={30} />
            <div>
              <h2 className="text-lg font-semibold">Chat to Us</h2>
              <p className="text-sm font-normal">
                Our friendly team is here to help
              </p>
            </div>
          </Link>

          {/* Visit Us */}
          <Link className="flex justify-start items-center gap-3">
            <FaLocationDot size={30} className="text-black" />
            <div>
              <h2 className="text-lg font-semibold">Visit Us</h2>
              <p className="text-sm font-normal">
                873 Khati Baba Road, Deen Dayal <br /> Nagar, Jhansi (U P),
                India
              </p>
            </div>
          </Link>

          {/* Call Us */}
          <Link className="flex justify-start items-center gap-3">
            <PiPhoneCallFill size={30} className="text-black" />
            <div>
              <h2 className="text-lg font-semibold">Call Us</h2>
              <p className="text-sm font-normal">+91 7905786808</p>
            </div>
          </Link>
        </div>

        {/* Contact Section Part-2 */}
        <div className="max-w-xl w-full bg-[#BAFE66] rounded-3xl flex flex-col gap-5 p-5 md:p-10">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-medium leading-[1.2]">
            Got ideas? We've got <br /> the skills. Let's team up.
          </h2>
          <p className="text-sm font-medium pt-2">
            Tell us more about yourself and what you're got in mind.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSumbit}>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              className="w-full p-3 border-b border-black focus:outline-none"
              autoFocus
              autoComplete="off"
              onChange={handleInputChange}
              value={contact.username}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border-b border-black focus:outline-none"
              onChange={handleInputChange}
              value={contact.email}
              autoComplete="off"
              required
            />
            <textarea
              rows="3"
              name="message"
              placeholder="Message"
              className="w-full p-3 border-b border-black focus:outline-none"
              onChange={handleInputChange}
              value={contact.message}
              autoComplete="off"
              required
            />
            <button className="w-full p-3 bg-black text-white rounded-full mt-3 md:mt-5 tracking-widest">
              Let's Get In Touch
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
