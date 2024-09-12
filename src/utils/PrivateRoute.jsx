import React, { useContext, useEffect } from "react"; // Import React and necessary hooks
import AuthContext from "../context/AuthContext"; // Import the authentication context
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { Navigate, Outlet } from "react-router-dom"; // Import components for routing

const PrivateRoute = () => {
  const { token } = useContext(AuthContext); // Get the authentication token from the context

  useEffect(() => {
    if (!token) {
      // Check if the token is not present (user is not authenticated)
      toast.error("You have to login first", {
        // Show an error toast message
        id: "zzz", // Unique identifier for the toast message
      });
    }
  }, [token]); // Dependency array; effect runs whenever the `token` changes

  return token ? ( // Check if the token exists
    <Outlet /> // If authenticated, render the nested routes inside this component
  ) : (
    <Navigate to="/signin" replace /> // If not authenticated, redirect to the signin page
  );
};

export default PrivateRoute; // Export the PrivateRoute component
