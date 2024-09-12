import React from "react";
import { useFetch } from "../../hooks/useFetch";
// Imports the custom hook useFetch to fetch movie data.
import MovieCard from "../../components/MovieCard/MovieCard";
// Imports the MovieCard component to display individual movie details.
import { useCustomParams } from "../../hooks/useCustomParams";
// Imports the custom hook useCustomParams to handle search/filter logic.
import Loading from "../../utils/Loading";
// Imports the Loading component to display a loading spinner or message.
import SearchResult from "../Home/SearchResult";
// Imports the SearchResult component to display search results.
import "./Movies.css";
// Imports the CSS styles for the Movies component.

const Movies = () => {
  const { data, error, loading, updateUI } = useFetch("/api/movie/movies");
  // Uses the useFetch hook to fetch data from the /api/movie/movies endpoint.

  const { userInput, filteredMovies } = useCustomParams(data);
  // Uses the useCustomParams hook to filter movies based on search input.

  if (loading) {
    // If loading is true, display a loading message.
    return <Loading message="Fetching Movies..." />;
  }

  if (error) {
    // If there is an error, display an error message.
    return <p>Error loading movies. Please try again later.</p>;
  }

  if (userInput) {
    // If there is user input (search query), display search results.
    return (
      <SearchResult userInput={userInput} filteredMovies={filteredMovies} />
    );
  }

  return (
    <div className="movepage">
      {/* Container for movies */}
      <h2>Movies</h2>
      {/* Header for the movies section */}
      <div className="mopacard">
        {/* Container for movie cards */}
        {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} updateUI={updateUI} />
        ))}
        {/* Renders MovieCard components for each movie */}
      </div>
    </div>
  );
};

export default Movies;
// Exports the Movies component for use in other parts of the application.
