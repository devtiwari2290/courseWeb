import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="about bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-2">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About CourseCo</h3>
            <p className=" text-sm text-gray-400 tracking-wide leading-6">
              At CourseCo, our mission is to empower learners with the skills
              needed to excel in the ever-evolving tech industry. We provide
              hands-on coding courses designed for beginners and professionals
              alike. Whether you're starting your programming journey or looking
              to advance your skills, CourseCo is here to guide you every step
              of the way.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className=" text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="font-normal space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-300">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className=" text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} className="w-6 h-6 text-blue-500" />
              </Link>
              <Link
                to={"#"}
                className="hover:text-gray-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} className="w-6 h-6 text-blue-400" />
              </Link>
              <Link
                to={"#"}
                className="hover:text-gray-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} className="w-6 h-6 text-pink-500" />
              </Link>

              <Link
                to={"#"}
                className="hover:text-gray-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} className="w-6 h-6 text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CourseCo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
