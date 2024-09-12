import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
// Imports the MovieCard component to display individual movie details.
import Loading from "../../utils/Loading";
// Imports the Loading component to show a loading spinner or message.
import "./SearchResult.css";
// Imports CSS styles for the SearchResult component.

const SearchResult = ({ userInput, filteredMovies }) => {
  // Destructures props: userInput (search query) and filteredMovies (filtered list of movies).

  if (filteredMovies === null) {
    // If filteredMovies is null, return null (render nothing).
    return null;
  }

  if (filteredMovies.length === 0) {
    // If filteredMovies is an empty array, display a message indicating no results.
    return <p className="text-white">No results found for '{userInput}'</p>;
  }

  return (
    <div className="result">
      {/* Container for displaying search results */}
      <h2>
        Found {filteredMovies.length} result(s) for '{userInput}'
      </h2>
      {/* Displays the number of results and the search query */}

      {filteredMovies.length > 0 && (
        // Only render if there are results.
        <div className="result-fill">
          {/* Container for the filtered movie cards */}
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
            // Maps over filteredMovies and renders a MovieCard for each movie.
          ))}
        </div>
      )}

      {filteredMovies.length === 0 && <Loading message="Fetching results..." />}
      {/* If there are no results, display a loading message. */}
    </div>
  );
};

export default SearchResult;
// Exports the SearchResult component for use in other parts of the application.
