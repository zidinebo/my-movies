import React from "react";
// Imports React library to use JSX and React features.
import { Link, Outlet } from "react-router-dom";
// Imports `Link` for navigation and `Outlet` to render nested routes.
import redmovie from "../assets/Movie.png";
// Imports the logo image to be used in the component.
import "./AuthLayout.css";
// Imports CSS file for styling the component.

const AuthLayout = () => {
  return (
    <div>
      <Link className="redlo" to="/" aria-label="Home">
        {/* `Link` component for navigation. Redirects to the home page when clicked.
            `className="redlo"` applies styling from the CSS file.
            `aria-label="Home"` provides an accessible label for screen readers. */}
        <img src={redmovie} alt="redmovie" />
        {/* Displays the logo image. `alt="redmovie"` provides alternative text for accessibility. */}
      </Link>
      <Outlet />
      {/* `Outlet` component renders the matched child route components in this layout.
          This allows nested routing, where `AuthLayout` serves as a wrapper for authentication-related pages. */}
    </div>
  );
};

export default AuthLayout;
// Exports the `AuthLayout` component for use in other parts of the application.
