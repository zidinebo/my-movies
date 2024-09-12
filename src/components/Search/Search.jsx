import React, { useEffect, useState } from "react";
// Imports React and the useEffect and useState hooks from the React library.

import { useLocation, useSearchParams } from "react-router-dom";
// Imports useLocation and useSearchParams hooks from `react-router-dom` for handling URL parameters and routing.

import teloscope from "../../assets/Shape (1).png";
// Imports an image asset for the search icon.

import "./Search.css";
// Imports the CSS file for styling the `Search` component.

const Search = () => {
  // Defines the `Search` functional component.

  const [searchParams, setSearchParams] = useSearchParams();
  // Destructures search parameters from the URL and provides a function to update them.

  const [userInput, setUserInput] = useState("");
  // State to manage the current value of the search input field.

  const [placeholder, setPlaceholder] = useState(
    "Search for movies, TV series, or bookmarked shows"
  );
  // State to manage the placeholder text of the search input field.

  const location = useLocation();
  // Gets the current location object, which includes the pathname.

  useEffect(() => {
    // Effect to update the search input field when the URL parameters change.
    setUserInput(searchParams.get("search") || "");
    // Sets the `userInput` state with the value of the `search` query parameter, or an empty string if not present.
  }, [searchParams]);
  // Dependency array: runs the effect whenever `searchParams` changes.

  useEffect(() => {
    // Effect to update the placeholder text based on the current route.
    setPlaceholder(
      `Search for ${
        location.pathname === "/"
          ? "movies, TV series"
          : location.pathname.substring(1)
      }`
    );
    // Updates the placeholder text to reflect the current route:
    // - If the route is "/", placeholder is "Search for movies, TV series".
    // - Otherwise, it uses the path name as part of the placeholder text.
  }, [location]);
  // Dependency array: runs the effect whenever `location` changes.

  return (
    <div className="search-container">
      {/* Container for the search component */}

      <div className="telo mt-1">
        {/* Container for the search icon */}

        <img src={teloscope} alt="telo" />
        {/* Displays the search icon image with an alt text "telo" */}
      </div>

      <div className="search">
        {/* Container for the search input field */}

        <input
          onChange={(event) => {
            setSearchParams({ search: event.target.value });
            setUserInput(event.target.value);
          }}
          // Updates the URL search parameters and state on input change.
          // Sets `search` parameter to the current input value.
          // Also updates `userInput` state to the current input value.

          value={userInput}
          // Sets the value of the input field to the current `userInput` state.

          type="text"
          // Specifies that the input type is text.

          placeholder={placeholder}
          // Sets the placeholder text of the input field based on the current `placeholder` state.
        />
      </div>
    </div>
  );
};

export default Search;
// Exports the `Search` component for use in other parts of the application.
