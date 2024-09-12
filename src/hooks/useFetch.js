import { useEffect, useState } from "react";
// Imports React hooks: `useEffect` for handling side effects and `useState` for managing state.
import axiosInstance from "../utils/axiosConfig";
// Imports an instance of Axios configured with default settings for making HTTP requests.
import toast from "react-hot-toast";
// Imports `toast` for showing notifications to the user.
import { useNavigate } from "react-router-dom";
// Imports `useNavigate` for programmatic navigation in the app.

export const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  // Initializes state to store the fetched data, initially set to null.
  const [error, setError] = useState(null);
  // Initializes state to store any errors encountered during data fetching.
  const [loading, setLoading] = useState(true);
  // Initializes state to manage the loading state, initially set to true.
  const navigate = useNavigate();
  // Hook for navigation in the app.

  const fetchData = async () => {
    // Asynchronous function to fetch data from the provided URL.
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          // Sets Authorization header if token is provided.
        },
      });

      setData(response.data.data);
      // Updates the `data` state with the data retrieved from the API response.
    } catch (error) {
      handleError(error);
      // Handles any errors that occur during the fetch operation.
    } finally {
      setLoading(false);
      // Sets `loading` to false once the fetch operation is complete (success or failure).
    }
  };

  const handleError = (error) => {
    // Function to handle errors.
    if (error.message === "Network Error") {
      setError("Server is down, please refresh");
      // Sets a specific error message for network errors.
    }

    if (error.response?.status === 401) {
      toast.error("Login to view bookmarks", { id: "z" });
      // Shows an error toast if the status code is 401 (Unauthorized) and navigates to the signin page.
      navigate("/signin");
    }

    setError("Something went wrong");
    // Sets a generic error message for other errors.
  };

  const toggleAddBookmark = (movieId, userId) => {
    // Function to update the bookmark status of a movie.
    const updatedData = data.map(
      (movie) =>
        movie._id === movieId ? { ...movie, bookmarkedBy: [userId] } : movie
      // Updates the movie object in `data` to add the userId to `bookmarkedBy` if the movieId matches.
    );

    setData(updatedData);
    // Updates the `data` state with the modified list.
    toast.success("Movie Bookmarked");
    // Shows a success toast notification.
  };

  const toggleRemoveBookmark = (movieId) => {
    // Function to remove the bookmark status of a movie.
    const updatedData = data.map(
      (movie) =>
        movie._id === movieId ? { ...movie, bookmarkedBy: [] } : movie
      // Updates the movie object in `data` to clear `bookmarkedBy` if the movieId matches.
    );

    setData(updatedData);
    // Updates the `data` state with the modified list.
    toast.success("Movie Removed");
    // Shows a success toast notification.
  };

  const handleAddBookmark = async (movieId, token, userId) => {
    // Asynchronous function to handle adding a bookmark.
    if (!userId) {
      return toast.error("Login to Bookmark");
      // Shows an error toast if userId is not provided.
    }

    try {
      toggleAddBookmark(movieId, userId);
      // Updates the bookmark status locally before making the API request.
      await axiosInstance.get(`/api/bookmark/add/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Sets Authorization header for the API request.
        },
      });
    } catch (error) {
      toast.error("Login to Bookmark");
      // Shows an error toast if there is an error during the API request.
    }
  };

  const handleRemoveBookmark = async (movieId, token) => {
    // Asynchronous function to handle removing a bookmark.
    try {
      toggleRemoveBookmark(movieId);
      // Updates the bookmark status locally before making the API request.
      await axiosInstance.get(`/api/bookmark/remove/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Sets Authorization header for the API request.
        },
      });
    } catch (error) {
      // Optionally handle errors here.
    }
  };

  const updateUI = async (action, movieId, token, userId) => {
    // Function to determine whether to add or remove a bookmark based on the action parameter.
    if (action === "add") {
      handleAddBookmark(movieId, token, userId);
    } else {
      handleRemoveBookmark(movieId, token);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
      // Delays the fetch operation by 2 seconds to reduce the number of requests.
    }, 2000);

    return () => clearTimeout(timeoutId);
    // Clears the timeout if the component unmounts or the URL changes before the timeout completes.
  }, [url]);
  // `useEffect` runs whenever the `url` changes.

  return { data, error, loading, updateUI };
  // Returns the `data`, `error`, `loading` state, and `updateUI` function for use in components.
};
