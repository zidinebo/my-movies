import React from "react";
import { useFetch } from "../../hooks/useFetch";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useCustomParams } from "../../hooks/useCustomParams";
import Loading from "../../utils/Loading";
import SearchResult from "../Home/SearchResult";
import "./TvSeries.css";

const TvSeries = () => {
  // Fetch TV series data using the custom useFetch hook
  const { data, error, loading, updateUI } = useFetch("/api/movie/series");

  // Use custom hook to handle search input and filter results
  const { userInput, filteredMovies } = useCustomParams(data);

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading message="Fetching TV Series..." />;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <p>Error loading series. Please try again later.</p>;
  }

  // Show search results if there is user input
  if (userInput) {
    return (
      <SearchResult userInput={userInput} filteredMovies={filteredMovies} />
    );
  }

  // Render TV series list if data is available
  return (
    <div className="tvspage">
      <h2>TV Series</h2>
      <div className="tvsscards">
        {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} updateUI={updateUI} />
        ))}
      </div>
    </div>
  );
};

export default TvSeries;
