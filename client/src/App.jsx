import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routess from "./routes/Routess";
import ScrollToTop from "./components/ScrollToTop";
import GoToTop from "./components/GoToTop";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Routess />
      <GoToTop />
      <Footer />
    </>
  );
};

export default App;
