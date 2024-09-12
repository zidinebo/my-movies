import React from "react"; // Import React library
import "./Spinner.css"; // Import CSS file for styling the spinner component
import Loading from "./Loading"; // Import the Loading component

// Define the Spinner component
const Spinner = ({ isLoading }) => {
  // `isLoading` is a prop that determines whether to show the spinner or not
  if (!isLoading) {
    // Check if `isLoading` is false (i.e., loading is complete or not required)
    return <Loading />; // Render the `Loading` component if not loading
  }

  // Render the spinner UI if `isLoading` is true
  return (
    <div className="spinner-container">
      {" "}
      {/* Container for the spinner */}
      <p className="m-0">Loading...</p> {/* Text indicating loading status */}
    </div>
  );
};

export default Spinner; // Export the Spinner component for use in other parts of the application
