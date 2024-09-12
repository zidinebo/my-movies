import React, { useState } from "react";
// Imports React and the useState hook for managing component state.
import { RiFilmFill } from "react-icons/ri";
// Imports icon for movies from react-icons.
import { PiTelevisionFill } from "react-icons/pi";
// Imports icon for TV series from react-icons.
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
// Imports icons for bookmarking functionality from react-icons.
import useAuth from "../../hooks/useAuth";
// Imports the custom hook for authentication context.
import "./MovieCarosel.css";
// Imports CSS styles for the MovieCarousel component.

const MovieCarousel = ({ data, updateUI }) => {
  const { user, token } = useAuth();
  // Retrieves user and token from the authentication context.

  const [currentIndex, setCurrentIndex] = useState(0);
  // Manages the index of the currently visible movie card.

  // Handles moving to the previous movie card.
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // Handles moving to the next movie card.
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Determines if the previous or next buttons should be disabled.
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === data.length - 1;

  return (
    <div className="caro-contana">
      {/* Container for the carousel */}
      <div
        className="caro-omg"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        // Applies a CSS transform to shift the carousel items based on the current index.
      >
        {data.map((movie) => {
          const { _id, title, year, type, rated, image, bookmarkedBy } = movie;
          // Destructures movie data from the array.

          const isBookmarked = user && bookmarkedBy.includes(user.id);
          // Checks if the movie is bookmarked by the current user.

          return (
            <div key={_id} className="caro-con">
              {/* Container for each movie card */}
              <div className="caro-card">
                {/* Container for the movie image and bookmark icon */}
                <img src={image} alt={`Poster for ${title}`} />
                {/* Displays the movie poster */}
                <div className="bookmark">
                  {user &&
                    token &&
                    (isBookmarked ? (
                      <BiSolidBookmark
                        onClick={() => updateUI("remove", _id, token, user.id)}
                      />
                    ) : (
                      // Displays filled bookmark icon if the movie is bookmarked.
                      <BiBookmark
                        onClick={() => updateUI("add", _id, token, user.id)}
                      />
                      // Displays empty bookmark icon if the movie is not bookmarked.
                    ))}
                </div>
              </div>

              <div className="inner-icons">
                {/* Container for movie details and icons */}
                <div className="rating">
                  <p className="m-0">{year}</p>
                  <p className="dotts mb-1">.</p>
                  <span className="type">
                    {type === "movie" ? <RiFilmFill /> : <PiTelevisionFill />}
                    {/* Displays movie or TV series icon based on the type */}
                    <p className="m-0">
                      {type === "movie" ? "Movie" : "TV Series"}
                      {/* Displays the type of the movie */}
                    </p>
                  </span>
                  <p className="dotts mb-1">.</p>
                  <p className="m-0">{rated}</p>
                </div>
                <p className="m-0 movtits">{title}</p>
                {/* Displays movie title */}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={`prev-button ${isPrevDisabled ? "disabled" : ""}`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        Prev
        {/* Button to go to the previous movie card */}
      </button>
      <button
        className={`next-button ${isNextDisabled ? "disabled" : ""}`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
        {/* Button to go to the next movie card */}
      </button>
    </div>
  );
};

export default MovieCarousel;
// Exports the MovieCarousel component for use in other parts of the application.
