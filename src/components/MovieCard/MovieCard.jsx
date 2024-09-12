import React from "react";
// Imports React to use JSX and component functionalities.

import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
// Imports bookmark icons from `react-icons/bi` for indicating bookmark status.

import { RiFilmFill } from "react-icons/ri";
// Imports a film icon from `react-icons/ri` for movie type indication.

import { PiTelevisionFill } from "react-icons/pi";
// Imports a television icon from `react-icons/pi` for TV series type indication.

import useAuth from "../../hooks/useAuth";
// Imports a custom hook `useAuth` for accessing authentication-related information.

import "./MovieCard.css";
// Imports the CSS file for styling the `MovieCard` component.

const MovieCard = ({ movie, updateUI }) => {
  // Defines the `MovieCard` functional component.
  // It receives `movie` (object with movie details) and `updateUI` (function to handle bookmark actions) as props.

  const { user, token } = useAuth();
  // Destructures `user` and `token` from the `useAuth` hook to get authentication details.

  const { _id, image, title, year, type, rated, bookmarkedBy } = movie;
  // Destructures movie details from the `movie` prop.

  const bookmarkIcon = bookmarkedBy.includes(user?.id) ? (
    // Checks if the current user has already bookmarked this movie.
    <BiSolidBookmark
      onClick={() => {
        // Displays the solid bookmark icon if the movie is bookmarked by the user.
        updateUI("remove", _id, token, user?.id);
        // Calls `updateUI` function with parameters to remove the bookmark.
      }}
    />
  ) : (
    <BiBookmark
      onClick={() => {
        // Displays the empty bookmark icon if the movie is not bookmarked by the user.
        updateUI("add", _id, token, user?.id);
        // Calls `updateUI` function with parameters to add the bookmark.
      }}
    />
  );

  return (
    <div className="movie-card">
      {/* Main container for the movie card */}

      <div className="maincards">
        {/* Container for the movie image and bookmark icon */}

        <img src={image} alt={`Poster for ${title}`} />
        {/* Displays the movie poster image with an alt text describing the movie title */}

        <div className="bkmak">{bookmarkIcon}</div>
        {/* Displays the bookmark icon based on the bookmark status */}

        <div className="empty"></div>
        {/* Empty div for layout spacing */}
      </div>

      <div className="movie-details">
        {/* Container for movie details such as year, type, and rating */}

        <div className="cardico">
          {/* Container for icons and movie details */}

          <p className="m-0">{year}</p>
          {/* Displays the release year of the movie */}

          <p className="dott mb-1">.</p>
          {/* Dot separator for styling */}

          <span className="doicon">
            {/* Container for the movie type icon */}

            {type === "movie" ? <RiFilmFill /> : <PiTelevisionFill />}
            {/* Displays a film icon for movies or a television icon for TV series based on the type */}

            <p className="m-0 tvvvm">
              {type === "movie" ? "Movie" : "TV Series"}
            </p>
            {/* Displays "Movie" or "TV Series" based on the type */}
          </span>

          <p className="dott mb-1">.</p>
          {/* Dot separator for styling */}

          <p className="m-0">{rated}</p>
          {/* Displays the rating of the movie */}
        </div>

        <div className="cardtits">
          {/* Container for the movie title */}

          <p className="m-0">{title}</p>
          {/* Displays the title of the movie */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
// Exports the `MovieCard` component for use in other parts of the application.
