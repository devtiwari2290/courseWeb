import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { SlMenu } from "react-icons/sl";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiCodechef } from "react-icons/si";
import { useAuth } from "../store/auth";
import userIcon from "../assets/user.png";

const Header = () => {
  const { isAdmin, isLoggedIn, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="fixed z-20 bg-white flex justify-between px-4 md:px-10 items-center w-full h-[8vh] md:h-[10vh] shadow-md">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-1">
        <SiCodechef size={30} className="text-[#5766FF] cursor-pointer" />
        <h1 className="navbar text-lg md:text-2xl font-bold text-black">
          <span className="text-[#5766FF]">Course</span>Co
        </h1>
      </Link>

      {/* Main Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transform transition-transform flex flex-col gap-5 pt-14 duration-500 ease-in-out md:static md:h-auto md:w-auto md:flex-row md:items-center md:gap-10 md:bg-transparent md:shadow-none p-6 md:p-0 z-10 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 font-bold text-black md:hidden"
          onClick={closeMenu}
        >
          <LiaTimesSolid size={24} />
        </button>
        <NavLink
          to="/"
          style={(e) => ({ color: e.isActive ? "red" : "black" })}
          className="menu-link text-black font-semibold text-sm   rounded-2xl"
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          style={(e) => ({ color: e.isActive ? "red" : "black" })}
          className="menu-link text-black font-semibold text-sm rounded-2xl"
          onClick={closeMenu}
        >
          About
        </NavLink>
        <NavLink
          style={(e) => ({ color: e.isActive ? "red" : "black" })}
          to="/services"
          className="menu-link text-black font-semibold text-sm  rounded-2xl"
          onClick={closeMenu}
        >
          Services
        </NavLink>
        <NavLink
          style={(e) => ({ color: e.isActive ? "red" : "black" })}
          to="/contact"
          className="menu-link text-black font-semibold text-sm  rounded-2xl"
          onClick={closeMenu}
        >
          Contact-Us
        </NavLink>

        {/* Right-side Buttons for Desktop & Mobile */}
        <div className="flex flex-col md:flex-row gap-3 mt-2 items-start md:items-center relative  md:mt-0 self-start">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white text-sm md:text-base font-semibold flex items-center gap-2 bg-black px-3 py-2 rounded-xl"
              >
                <img
                  src={userIcon}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                  alt=""
                />
                <h2 className="navbar text-white text-base tracking-wide md:text-lg font-medium">
                  {user ? user.username.slice(0, 7) : "User"}
                </h2>

                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full">
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                </span>
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="about absolute left-0 md:left-auto md:right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-10">
                  {isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm font-normal text-black hover:bg-gray-100"
                      onClick={() => {
                        closeDropdown();
                        closeMenu();
                      }}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  {isAdmin && (
                    <NavLink
                      to="/admin/users"
                      className="block px-4 py-2 text-sm font-normal text-black hover:bg-gray-100"
                      onClick={() => {
                        closeDropdown();
                        closeMenu();
                      }}
                    >
                      Users
                    </NavLink>
                  )}

                  {/* Show User Profile ONLY for Logged-in Users (NOT Admins) */}
                  {isLoggedIn && !isAdmin && (
                    <NavLink
                      to="/user/profile"
                      className="block px-4 py-2 text-sm font-normal text-black hover:bg-gray-100"
                      onClick={() => {
                        closeDropdown();
                        closeMenu();
                      }}
                    >
                      User Profile
                    </NavLink>
                  )}

                  <NavLink
                    to="/logout"
                    className="block px-4 py-2 text-sm font-normal text-black hover:bg-gray-100"
                    onClick={() => {
                      closeDropdown();
                      closeMenu();
                    }}
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/register">
                <button
                  className="text-white bg-black text-sm md:text-base font-semibold flex items-center gap-1 px-3 py-3 rounded-xl w-full md:w-auto"
                  onClick={closeMenu}
                >
                  Sign Up
                  <IoIosArrowRoundForward size={20} />
                </button>
              </NavLink>
              <NavLink to="/login" onClick={closeMenu}>
                <button className="text-white text-sm tracking-wide md:text-base font-semibold flex items-center gap-2 bg-black px-3 py-[9px] md:py-[8px] rounded-xl w-full md:w-auto">
                  <img
                    src={userIcon}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    alt=""
                  />
                  Log in
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <SlMenu
          className="text-2xl font-bold text-black cursor-pointer"
          onClick={toggleMenu}
        />
        {/* {isMenuOpen ? (
          <LiaTimesSolid
            className="text-2xl text-black cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <SlMenu
            className="text-2xl text-black cursor-pointer"
            onClick={toggleMenu}
          />
        )} */}
      </div>
    </nav>
  );
};

export default Header;
