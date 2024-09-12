import React, { useEffect, useState } from "react";
// Imports React and hooks for building and managing the component state.

import { PiTelevisionFill } from "react-icons/pi";
// Imports the TV series icon from `react-icons`.

import { MdWindow } from "react-icons/md";
// Imports the home window icon from `react-icons`.

import { RiFilmFill } from "react-icons/ri";
// Imports the film icon from `react-icons`.

import { FaBookmark } from "react-icons/fa";
// Imports the bookmark icon from `react-icons`.

import logo from "../../assets/entertainment app logo.png";
// Imports the logo image.

import redmovie from "../../assets/Movie.png";
// Imports the movie image.

import { Link, useLocation } from "react-router-dom";
// Imports `Link` for navigation and `useLocation` to get the current route.

import "./SideBar.css";
// Imports the CSS file for styling.

import DropDown from "./DropDown";
// Imports the `DropDown` component for showing additional options.

const SideBar = () => {
  const [selected, setSelected] = useState("/");
  // State to track the currently selected route.

  const [hoveredIcon, setHoveredIcon] = useState(null);
  // State to track which icon is being hovered over.

  const location = useLocation();
  // Gets the current location object from `react-router-dom`.

  const [toggleDropDown, setToggleDropDown] = useState(true);
  // State to toggle the visibility of the dropdown menu.

  useEffect(() => {
    const { pathname } = location;
    // Destructures the pathname from the location object.

    setSelected(pathname);
    // Updates the selected route based on the current pathname.
  }, [location]);
  // Runs the effect whenever the location changes.

  const isIconSelected = (path) => (selected === path ? "#ffffff" : "#5A698F");
  // Function to determine the color of an icon based on whether it is selected or hovered over.

  return (
    <div className="sidebar">
      {/* Container for the sidebar */}

      <Link className="redmovie" to="/">
        <img src={redmovie} alt="" />
      </Link>
      {/* Link to the home page with an image of a movie */}

      <div className="movicon">
        {/* Container for the navigation icons */}

        <Link
          to="/"
          style={{
            color:
              selected === "/"
                ? "#ffffff" // White color if the icon's path is selected.
                : hoveredIcon === "/"
                ? "#fc4747" // Red color if the icon is being hovered over.
                : "#5A698F", // Default color if neither selected nor hovered.
          }}
          onMouseEnter={() => setHoveredIcon("/")}
          onMouseLeave={() => setHoveredIcon(null)}
          // Updates the hoveredIcon state on mouse enter and leave.
        >
          <MdWindow />
        </Link>

        <Link
          to="/movies"
          style={{
            color:
              selected === "/movies"
                ? "#ffffff"
                : hoveredIcon === "/movies"
                ? "#fc4747"
                : "#5A698F",
          }}
          onMouseEnter={() => setHoveredIcon("/movies")}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <RiFilmFill />
        </Link>

        <Link
          to="/tvseries"
          style={{
            color:
              selected === "/tvseries"
                ? "#ffffff"
                : hoveredIcon === "/tvseries"
                ? "#fc4747"
                : "#5A698F",
          }}
          onMouseEnter={() => setHoveredIcon("/tvseries")}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <PiTelevisionFill />
        </Link>

        <Link
          to="/bookmark"
          style={{
            color:
              selected === "/bookmark"
                ? "#ffffff"
                : hoveredIcon === "/bookmark"
                ? "#fc4747"
                : "#5A698F",
          }}
          onMouseEnter={() => setHoveredIcon("/bookmark")}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <FaBookmark />
        </Link>
      </div>

      <div className="mainlo position-relative">
        {/* Container for the logo and dropdown */}

        <img
          onClick={() => {
            setToggleDropDown(!toggleDropDown);
            // Toggles the visibility of the dropdown menu when the logo is clicked.
          }}
          src={logo}
          alt="applogo"
        />

        {toggleDropDown ? <DropDown /> : null}
        {/* Conditionally renders the DropDown component based on the toggleDropDown state */}
      </div>
    </div>
  );
};

export default SideBar;
// Exports the `SideBar` component for use in other parts of the application.
