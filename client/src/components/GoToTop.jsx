import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 md:p-4 lg:p-5 rounded-full shadow-lg"
          onClick={handleGoToTop}
        >
          <FaArrowUp className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>
      )}
    </>
  );
};

export default GoToTop;
