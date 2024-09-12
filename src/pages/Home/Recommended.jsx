import React from "react";
import Loading from "../../utils/Loading";
// Imports the Loading component to show a loading spinner or message.
import "./Recommended.css";
// Imports CSS styles for the Recommended component.
import MovieCard from "../../components/MovieCard/MovieCard";
// Imports the MovieCard component to display individual movie details.

const Recommended = ({ data, error, loading, updateUI }) => {
  // Destructures props: data (movies), error (if any), loading (loading state), and updateUI (function to handle bookmark updates).

  if (loading) {
    // If data is still loading, display the Loading component with a custom message.
    return <Loading message="Fetching Recommended Movies..." />;
  }

  if (error) {
    // If there is an error, display an error message.
    return <p>Error loading recommended movies. Please try again later.</p>;
  }

  return (
    <div className="recmaindata">
      {/* Container for displaying the list of recommended movies */}
      {data.map((movie) => (
        // Maps over the data array to create a MovieCard for each movie.
        <MovieCard key={movie._id} movie={movie} updateUI={updateUI} />
      ))}
    </div>
  );
};

export default Recommended;
// Exports the Recommended component for use in other parts of the application.
