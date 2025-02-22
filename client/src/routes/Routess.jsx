import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { Logout } from "../pages/Logout";
import AdminLayout from "../layout/Admin-Layout";
import AdminUsers from "../pages/Admin-Users";
import AdminContacts from "../pages/Admin-Contacts";
import AdminServices from "../pages/Admin-Services";
import AdminUpdate from "../pages/Admin-Update";
import AdminDashBoard from "../pages/AdminDashBoard";
import UserProfile from "../pages/User-Profile";
import UserUpdateProfile from "../pages/User-Update-Profile";
import ForgotPassword from "../pages/Forgot-Password";

const Routess = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/profile/:id" element={<UserUpdateProfile />} />{" "}
      <Route path="forgot-password" element={<ForgotPassword />} />
      {/* Fixed Path */}
      <Route path="*" element={<NotFound />} />
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id/edit" element={<AdminUpdate />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="services" element={<AdminServices />} />
      </Route>
    </Routes>
  );
};

export default Routess;
