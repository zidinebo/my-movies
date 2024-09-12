import React from "react";
// Imports React for building the component.

import useAuth from "../../hooks/useAuth";
// Imports the custom hook `useAuth` which provides authentication-related functionality.

import { Link } from "react-router-dom";
// Imports `Link` from `react-router-dom` for navigation between routes.

const DropDown = () => {
  // Defines the `DropDown` functional component.

  const { token, handleLogOutUser } = useAuth();
  // Destructures `token` and `handleLogOutUser` from `useAuth` hook.
  // `token` indicates if the user is logged in.
  // `handleLogOutUser` is a function to log out the user.

  return (
    <div className="mt-3 position-absolute my-dropdown">
      {/* Container for the dropdown menu with some margin-top and absolute positioning */}

      {token ? (
        // If `token` exists (user is logged in):
        <div>
          <button
            onClick={() => {
              handleLogOutUser();
              // Calls the `handleLogOutUser` function to log out the user when the button is clicked.
            }}
            className="btn btn-danger text-white"
            // Applies Bootstrap button styles with a red background and white text.
          >
            LogOut
            {/* Button text */}
          </button>
        </div>
      ) : (
        // If `token` does not exist (user is not logged in):
        <div className="d-flex flex-column gap-2">
          {/* Container with a flexbox layout to arrange items vertically with a gap between them */}

          <Link to="/signup" className="btn btn-danger text-white">
            SignUp
            {/* Link to the sign-up page with button styles */}
          </Link>

          <Link to="/signin" className="btn btn-danger text-white">
            SignIn
            {/* Link to the sign-in page with button styles */}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropDown;
// Exports the `DropDown` component for use in other parts of the application.
