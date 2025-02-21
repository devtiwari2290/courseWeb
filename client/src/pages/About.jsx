import React from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/About.avif";
import { useAuth } from "../store/auth";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const { user } = useAuth();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    // About Section
    <div className="about w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 pb-10 px-5 md:px-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      {/* Heading Section */}
      <div className="flex flex-col gap-6 w-full max-w-2xl p-5 sm:p-5 text-center md:text-left">
        <p
          className=" text-base pt-5 md:pt-0 tracking-wide"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
        >
          Welcome {user ? `${user.username} to our website` : `to our website`},
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
        >
          Why Choose Us?
        </h2>

        {/* Information Sections */}
        {[
          {
            title: "Expertise:",
            text: "Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.",
          },
          {
            title: "Customization:",
            text: "We understand that every business is unique. That's why we create solutions tailored to your specific needs and goals.",
          },
          {
            title: "Customer-Centric Approach:",
            text: "We prioritize your satisfaction and provide top-notch support to address your IT concerns.",
          },
          {
            title: "Affordability:",
            text: "We offer competitive pricing without compromising on the quality of our services.",
          },
          {
            title: "Reliability:",
            text: "Count on us to be there when you need us. We're committed to ensuring your IT environment is reliable and available 24/7.",
          },
        ].map((item, index) => (
          <p
            key={index}
            className=" text-sm sm:text-base font-normal"
            data-aos="fade-right"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-delay="1200"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <span className="font-medium">{item.title} </span>
            {item.text}
          </p>
        ))}
        {/* Buttons Section */}
        <div
          className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-6 mt-5"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
        >
          <Link to="/register">
            <button className="px-6 py-2 text-lg font-medium bg-[#5056C6] text-white rounded-lg transition-transform transform hover:scale-105">
              Connect Now
            </button>
          </Link>
          <Link to="/services">
            <button className="px-6 py-2 text-lg font-medium border border-black rounded-lg transition-transform transform hover:scale-105">
              Learn More
            </button>
          </Link>
        </div>
      </div>
      {/* Image & Stats Section */}
      <div className="flex flex-col items-center w-full max-w-md">
        <img
          src={AboutImage}
          className="w-full object-cover rounded-xl"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-easing="ease-in-sine"
          alt="About Us"
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 mx-auto mt-6">
          {[
            { value: "3.5", label: "Years Experience" },
            { value: "23", label: "Project Challenges" },
            { value: "830+", label: "Positive Reviews" },
            { value: "100k", label: "Trusted Students" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#FAFAFA] text-black text-center font-semibold px-6 py-4 rounded-lg shadow-md"
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-delay="600"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-easing="ease-in-sine"
            >
              <h3 className="text-3xl font-medium">{stat.value}</h3>
              <p className="text-base font-normal">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
