import React from "react";
import Loading from "../../utils/Loading";
// Imports the Loading component to display a loading spinner or message.
import MovieCarousel from "./MovieCarosel";
// Imports the MovieCarousel component to display a carousel of trending movies.

const Trending = ({ data, error, loading, updateUI }) => {
  // Destructures props: data (movies data), error (any error message), loading (loading state), and updateUI (function to handle bookmark updates).

  if (loading) {
    // If loading is true, display a loading message.
    return <Loading message="Fetching Trending Movies..." />;
  }

  if (error) {
    // If there is an error, display an error message.
    return <p>Error loading trending movies. Please try again later.</p>;
  }

  return (
    <div>
      {/* Container for trending movies */}
      <MovieCarousel data={data} updateUI={updateUI} />
      {/* Renders the MovieCarousel component with data and updateUI props */}
    </div>
  );
};

export default Trending;
// Exports the Trending component for use in other parts of the application.
