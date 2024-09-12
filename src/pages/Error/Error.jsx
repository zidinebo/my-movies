import React from "react";
// Imports React library for building the UI.
import { Link } from "react-router-dom";
// Imports `Link` from `react-router-dom` for navigation.

const PageNotFound = () => {
  // Functional component to display a "Page Not Found" message.
  return (
    <div className="error-container">
      {/* Container for the error message. */}
      <h2>Error 404 - Page Not Found</h2>
      {/* Header displaying the error code and message. */}
      <p>Sorry, the requested page could not be found.</p>
      {/* Paragraph providing a brief explanation of the error. */}
      <Link to="/">Go Home</Link>
      {/* Link to navigate back to the home page. */}
    </div>
  );
};

export default PageNotFound;
// Exports the `PageNotFound` component for use in other parts of the application.
