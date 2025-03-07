import React from "react";
import { useEffect } from "react";
import HomeImage from "../assets/Homepage.png";
import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { use } from "react";

// Cards Section Data
const cardsData = [
  {
    image:
      "https://img.freepik.com/free-photo/smiling-young-handsome-man-hugging-note-pad-looking-camera-isolated-blue-background_141793-137325.jpg?t=st=1737977447~exp=1737981047~hmac=122d0b700c837d0f2712e8aa1ae812920d2a88b18feab908d2514931882c86ec&w=1800",
    name: "Harsh Vardhan",
    profile: "Frontend Developer",
    review:
      "I have learned a lot from CourseCo. The instructors are very knowledgeable and the courses are well-structured. I would highly recommend CourseCo to anyone looking to improve their coding skills.",
    company: "Google",
    course: "Frontend Development",
  },
  {
    image:
      "https://img.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2070.jpg?t=st=1737977487~exp=1737981087~hmac=7cea79ee4857a9279d612e9058060f1c1160f8e13ea6b7b2a998f30f6a32d0a5&w=1800",
    name: "Riya Singh",
    profile: "Machine Learning Engineer",
    review:
      "CourseCo has helped me to improve my coding skills. The courses are very informative and the instructors are very helpful. I would definitely recommend CourseCo to anyone looking to learn coding.",
    company: "Amazon",
    course: "Machine Learning",
  },

  {
    image:
      "https://img.freepik.com/free-photo/smiling-indian-man-casual-close-with-laptop-backpack-pastel-wall_496169-1583.jpg?t=st=1737977415~exp=1737981015~hmac=90b805334f299d752efd1c9e7c0a10a4fba8e351d440c12eb6f4b62c5d61f9a4&w=1800",
    name: "Rahul Sharma",
    profile: "Full Stack Developer",
    review:
      "I have learned a lot from CourseCo. The instructors are very knowledgeable and the courses are well-structured. I would highly recommend CourseCo to anyone looking to improve their coding skills.",
    company: "Microsoft",
    course: "Mern Stack Development",
  },

  {
    image:
      "https://img.freepik.com/free-photo/manager-has-arrived-office-portrait-attractive-young-woman-standing-with-black-bag_146671-16552.jpg?t=st=1737977518~exp=1737981118~hmac=e223fa64f68840ceb60ae1db374e4e0a7ee3b2bfb7d1335bf7d0a7e0dfafe1ca&w=1800",
    name: "Anjali Gupta",
    profile: "Data Scientist",
    review:
      "CourseCo has helped me to improve my coding skills. The courses are very informative and the instructors are very helpful. I would definitely recommend CourseCo to anyone looking to learn coding.",
    company: "Facebook",
    course: "Data Science",
  },
];

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="home w-full min-h-screen px-5 pb-10 md:pb-0 md:px-10 pt-28 md:pt-24">
        {/* Home Section Part 1 */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-7xl gap-10  mx-auto pt-0 md:pt-14">
          {/* Text Section */}
          <div className="w-full md:max-w-xl flex flex-col items-center space-y-5">
            {/* Mobile version with fade-up */}
            <div
              className="fade-up flex flex-col gap-5 w-full md:hidden"
              data-aos="fade-down"
              data-aos-offset="50"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              <h2 className="text-2xl md:text-5xl font-bold leading-[1.2] text-center md:text-left">
                Master New Skills with CourseCo
              </h2>
              <p className="text-sm md:text-base text-center md:text-left font-medium">
                Are you ready to take your coding journey <br /> to the next
                level?
              </p>

              {/* Get Started Button */}
              <div className="flex flex-col md:flex-row items-center gap-7">
                <Link to="/register">
                  <button className="button relative inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-blue-500 border border-black rounded-full overflow-hidden group">
                    <span className="relative z-10 transition-colors text-black duration-300 group-hover:text-white">
                      Get Started
                    </span>
                    <FaCircleArrowRight
                      size={20}
                      className="text-black transition-colors duration-300 group-hover:text-white"
                    />
                  </button>
                </Link>

                {/* Students Image Section */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <img
                      src="https://img.freepik.com/free-photo/education-students-happy-asian-woman-holding-notebooks-laughing-smiling-camera-enjoys-goi_1258-167794.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <img
                      src="https://img.freepik.com/free-photo/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall_140725-42642.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <img
                      src="https://img.freepik.com/free-photo/front-view-female-student-grey-jacket-wearing-yellow-backpack-holding-copybook-blue-wall_140725-46390.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  </div>

                  {/* Number of Students */}
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-sm md:text-lg font-bold">42k +</h2>
                    <p className="text-xs md:text-sm">Students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop version with fade-right */}
            <div
              className="fade-right flex flex-col space-y-5 w-full hidden md:block"
              data-aos="fade-right"
              data-aos-offset="50"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              <h2 className="text-2xl md:text-5xl font-bold leading-[1.2] text-center md:text-left">
                Master New Skills with CourseCo
              </h2>
              <p className="text-sm md:text-base text-center md:text-left font-medium">
                Are you ready to take your coding journey <br /> to the next
                level?
              </p>

              {/* Get Started Button */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <Link to="/register">
                  <button className="button relative inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-blue-500 border border-black rounded-full overflow-hidden group">
                    <span className="relative z-10 transition-colors text-black duration-300 group-hover:text-white">
                      Get Started
                    </span>
                    <FaCircleArrowRight
                      size={20}
                      className="text-black transition-colors duration-300 group-hover:text-white"
                    />
                  </button>
                </Link>

                {/* Students Image Section */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <img
                      src="https://img.freepik.com/free-photo/education-students-happy-asian-woman-holding-notebooks-laughing-smiling-camera-enjoys-goi_1258-167794.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <img
                      src="https://img.freepik.com/free-photo/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall_140725-42642.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <img
                      src="https://img.freepik.com/free-photo/front-view-female-student-grey-jacket-wearing-yellow-backpack-holding-copybook-blue-wall_140725-46390.jpg"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  </div>

                  {/* Number of Students */}
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-sm md:text-lg font-bold">42k +</h2>
                    <p className="text-xs md:text-sm">Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            {/* Mobile version - Fade Up */}
            <img
              src={HomeImage}
              alt="Not Found"
              className="h-80 w-80 rounded-2xl md:hidden"
              data-aos="fade-up"
              data-aos-offset="50"
              data-aos-delay="400"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            />

            {/* Desktop version - Fade Left */}
            <img
              src={HomeImage}
              alt="Not Found"
              className="h-80 w-80 md:h-100 md:w-100 rounded-2xl hidden md:block"
              data-aos="fade-left"
              data-aos-offset="50"
              data-aos-delay="400"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            />
          </div>
        </div>

        {/* Home Section Part 2 */}
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto mt-5 md:mt-14">
          <h2 className="text-2xl md:text-4xl font-bold text-center pt-10">
            Why Choose CourseCo?
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 pt-10"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            {/* Card 1 */}
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-online-tutor-illustration_52683-146749.jpg?t=st=1737973594~exp=1737977194~hmac=8d77ba3e90c98d4fca030369814ae5e4b088499a628f3c15d2f4b583842270c9&w=1800"
                alt="Not Found"
                className="h-48 w-60 md:h-60 md:w-72 rounded-2xl"
              />
              <h2 className="text-lg md:text-2xl font-bold text-center">
                Flexible Learning
              </h2>
              <p className="text-sm md:text-base font-medium text-center whitespace-pre-line">
                CourseCo offers a flexible learning experience <br /> that
                allows you to study at your own pace, <br /> from anywhere, and
                on any device.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              <img
                src="https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8112.jpg?t=st=1737973747~exp=1737977347~hmac=0d0ca52869a27ac2cc29dfea6e8ad62fef9b83bab24eb4c54687fa402821dd94&w=1800"
                alt=" Not Found"
                className="h-48 w-60 md:h-60 md:w-72 rounded-2xl"
              />
              <h2 className="text-lg md:text-2xl font-bold text-center">
                Expert Instructors
              </h2>
              <p className="text-sm md:text-base font-medium text-center">
                Our instructors are experts in their respective <br /> fields
                and are passionate about sharing <br /> their knowledge with
                you.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              <img
                src="https://img.freepik.com/free-vector/online-certification-concept_23-2148575665.jpg?t=st=1737974317~exp=1737977917~hmac=0e5bf0f1a9db9d4a2bea805edb74b2fd6ad7ec86ca785742ec0c97dcf3538ce0&w=1060"
                alt=" Not Found"
                className="h-48 w-60 md:h-60 md:w-72 rounded-2xl"
              />
              <h2 className="text-lg md:text-2xl font-bold text-center">
                Comprehensive Curriculum
              </h2>
              <p className="text-sm md:text-base font-medium text-center">
                Our curriculum is designed to cover a wide <br /> range of
                topics and provide a solid foundation <br /> for your learning
                journey.
              </p>
            </div>
          </div>

          {/* Our Specialities */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 w-full max-w-7xl mx-auto mt-10 md:mt-20">
            <h2
              className="text-2xl md:text-3xl font-bold text-center pt-10"
              data-aos="fade-right"
              data-aos-offset="100"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              Our Features <br /> Special For You
            </h2>
            <button
              className="bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg max-w-md mx-auto"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              Get Certificate
            </button>
            <button
              className="bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg max-w-md mx-auto"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              Amazing Instructor
            </button>
            <button
              className="bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg max-w-md mx-auto"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="300"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              Lifetime Support
            </button>
            <button
              className="bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg max-w-md mx-auto"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="400"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              Video Lessons
            </button>
          </div>
          <hr className="w-full max-w-7xl mx-auto my-7 md:my-10 border border-gray-200" />
        </div>

        {/* Home Section Part 3 */}
        <div className="w-full max-w-7xl mx-auto mt-5 md:mt-14 pb-10 md:pb-20">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            A Skill-Building Journey <br />
            with CourseCo
          </h2>
          <p className="text-xs md:text-base font-normal text-center pt-5">
            How CourseCo's Courses Helped You Master New Skills <br />
            and Advance in Your Career
          </p>

          {/* Cards Section */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-10 w-full max-w-7xl mx-auto mt-10 md:mt-14">
            {cardsData.map((card, index) => (
              <div
                className=" flex flex-col items-center gap-1 shadow-md shadow-black p-5 rounded-lg border border-dashed border-gray-300 mx-5 md:mx-0"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                key={index}
              >
                <img
                  src={card.image}
                  alt=" Not Found"
                  className="h-12 w-12 rounded-full object-cover "
                />
                <h2 className="text-lg md:text-2xl font-bold text-center ">
                  {card.name}
                </h2>
                <p className="text-sm md:text-base font-medium text-center">
                  {card.profile}
                </p>
                {/* Rating */}
                <div className="flex items-center gap-3 justify-center pt-3">
                  <MdOutlineStarPurple500
                    size={20}
                    className="text-yellow-400"
                  />
                  <MdOutlineStarPurple500
                    size={20}
                    className="text-yellow-400"
                  />
                  <MdOutlineStarPurple500
                    size={20}
                    className="text-yellow-400"
                  />
                  <MdOutlineStarPurple500
                    size={20}
                    className="text-yellow-400"
                  />
                  <MdOutlineStarPurple500
                    size={20}
                    className="text-yellow-400"
                  />

                  <p className="text-xs md:text-sm  font-medium text-center">
                    {card.course}
                  </p>
                </div>
                <p className="text-sm md:text-base font-normal text-center pt-3">
                  {card.review}
                </p>
                <p className="text-sm md:text-base font-semibold text-center border-b pt-3">
                  {card.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
