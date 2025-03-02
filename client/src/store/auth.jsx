// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [services, setServices] = useState([]);
//   const authorizationToken = `Bearer ${token}`;

//   const storeTokenInLS = (serverToken) => {
//     localStorage.setItem("token", serverToken);
//     setToken(serverToken);
//   };

//   const isLoggedIn = !!token;
//   const isAdmin = user?.isAdmin;

//   const LogoutUser = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     toast.success("Logout Successfully");
//   };

//   const userAuthentication = async () => {
//     if (!token) return;

//     try {
//       setIsLoading(true);
//       const response = await axios.get("http://localhost:3000/api/auth/user", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: authorizationToken,
//         },
//       });

//       if (response.status === 200) {
//         const data = response.data;
//         console.log("User Data:", data.userData);
//         setUser(data.userData);
//         setIsLoading(false);
//       } else {
//         console.log("Error fetching user data:");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Authentication Error:", error);
//       toast.error(error.response?.data?.message || "Authentication failed");
//     }
//   };

//   useEffect(() => {
//     userAuthentication();
//   }, [token]);

//   const getServices = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/data/service"
//       );
//       if (response.status === 200) {
//         setServices(response.data.services || []);
//         console.log("Services Data:", response.data.services);
//       }
//     } catch (error) {
//       console.log(`Services frontend error: ${error}`);
//     }
//   };

//   useEffect(() => {
//     getServices();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         storeTokenInLS,
//         LogoutUser,
//         user,
//         services,
//         authorizationToken,
//         isLoading,
//         isAdmin,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return authContextValue;
// };

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = token ? `Bearer ${token}` : "";

  // Api Call
  const API = import.meta.env.VITE_APP_URI_API;
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = Boolean(token);
  const isAdmin = user?.isAdmin || false;

  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
  };

  const userAuthentication = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/api/auth/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        setUser(response.data.userData);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  const getServices = async () => {
    try {
      const response = await axios.get(`${API}/api/data/service`);
      if (response.status === 200) {
        setServices(response.data.services || []);
      }
    } catch (error) {
      console.error("Services frontend error:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        isAdmin,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
