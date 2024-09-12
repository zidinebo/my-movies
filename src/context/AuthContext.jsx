import { createContext, useState, useEffect } from "react";
// Imports React context, state management hooks, and effect hook.

import toast from "react-hot-toast";
// Imports `react-hot-toast` for displaying notifications.

import { useNavigate } from "react-router-dom";
// Imports `useNavigate` for programmatic navigation.

import axiosInstance from "../utils/axiosConfig";
// Imports a pre-configured axios instance for making API requests.

const AuthContext = createContext();
// Creates a new context for authentication, which will hold authentication data and methods.

export default AuthContext;
// Exports the context to be used in other components.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // State to store user information; initially set to null.

  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("token")) || null
  );
  // State to store the authentication token; initializes with the token from localStorage or null.

  const [authenticating, setAuthenticating] = useState(false);
  // State to track whether an authentication request is in progress.

  const navigate = useNavigate();
  // Initializes `useNavigate` for navigating programmatically.

  const handleRegisterUser = async (formData) => {
    setAuthenticating(true);
    // Sets authenticating state to true while the registration request is in progress.

    try {
      const { data } = await axiosInstance.post("/api/auth/register", formData);
      // Sends a POST request to register a new user with the provided form data.

      toast.success("Registration Successful");
      // Displays a success toast notification.

      localStorage.setItem("token", JSON.stringify(data.token));
      // Stores the received token in localStorage.

      setToken(data.token);
      // Updates the token state.

      setUser({ id: data.id });
      // Sets the user state with the new user's ID.

      navigate("/");
      // Navigates to the home page after successful registration.
    } catch (error) {
      handleAuthError(error);
      // Handles any errors that occur during registration.
    } finally {
      setAuthenticating(false);
      // Resets the authenticating state to false once the request is complete.
    }
  };

  const handleSignInUser = async (formData) => {
    setAuthenticating(true);
    // Sets authenticating state to true while the sign-in request is in progress.

    try {
      const { data } = await axiosInstance.post("/api/auth/login", formData);
      // Sends a POST request to sign in the user with the provided form data.

      toast.success("Welcome Back!");
      // Displays a success toast notification.

      localStorage.setItem("token", JSON.stringify(data.token));
      // Stores the received token in localStorage.

      setToken(data.token);
      // Updates the token state.

      setUser({ id: data.id });
      // Sets the user state with the user's ID.

      navigate("/");
      // Navigates to the home page after successful sign-in.
    } catch (error) {
      handleAuthError(error);
      // Handles any errors that occur during sign-in.
    } finally {
      setAuthenticating(false);
      // Resets the authenticating state to false once the request is complete.
    }
  };

  const handleGetUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Sends a POST request to get the user's data with the token included in the Authorization header.

      setUser(data);
      // Updates the user state with the received data.
    } catch (error) {
      handleAuthError(error);
      // Handles any errors that occur while fetching user data.
    }
  };

  const handleLogOutUser = () => {
    setUser(null);
    // Clears the user state.

    setToken(null);
    // Clears the token state.

    localStorage.removeItem("token");
    // Removes the token from localStorage.

    toast.success("See you soon");
    // Displays a success toast notification.

    navigate("/");
    // Navigates to the home page after logging out.
  };

  const handleAuthError = (error) => {
    if (error.response) {
      // If there's a response from the server with an error message:
      // toast.error(error.response.data.message);
      // Uncomment this line to display the error message from the response.
    } else {
      // If no response is received:
      // toast.error("Something went wrong");
      // Uncomment this line to display a generic error message.
    }
  };

  useEffect(() => {
    handleGetUser();
    // Fetches the user data when the component mounts or the token changes.
  }, [token]);
  // Dependency array includes `token`, so the effect runs whenever the token changes.

  const contextData = {
    user,
    token,
    handleRegisterUser,
    handleSignInUser,
    authenticating,
    handleGetUser,
    handleLogOutUser,
  };
  // Defines the context value with authentication data and methods.

  return (
    <AuthContext.Provider value={contextData}>
      {children}
      {/* Provides the authentication context to all child components. */}
    </AuthContext.Provider>
  );
};
