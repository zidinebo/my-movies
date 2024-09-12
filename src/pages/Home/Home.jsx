import React from "react";
// Imports React library for building the UI.
import Trending from "./Trending";
// Imports the `Trending` component for displaying trending movies or shows.
import Recommended from "./Recommended";
// Imports the `Recommended` component for displaying recommended movies or shows.
import { useFetch } from "../../hooks/useFetch";
// Imports the `useFetch` custom hook for fetching data from an API.
import SearchResult from "./SearchResult";
// Imports the `SearchResult` component for displaying search results.
import { useCustomParams } from "../../hooks/useCustomParams";
// Imports the `useCustomParams` custom hook for handling search parameters.
import Loading from "../../utils/Loading";
// Imports the `Loading` component for displaying a loading indicator.
import "./Home.css";
// Imports CSS styles for the `Home` component.

const Home = () => {
  // Functional component for the home page of the application.

  const { data, error, loading, updateUI } = useFetch("/api/movie");
  // Uses the `useFetch` hook to get data, error, loading status, and update function from the API endpoint "/api/movie".

  const { userInput, filteredMovies } = useCustomParams(data);
  // Uses the `useCustomParams` hook to get the user input from the search and filtered movies based on that input.

  if (loading) {
    return <Loading />;
    // If data is still loading, show the `Loading` component.
  }

  if (error) {
    return <p className="text-white">{error}: Kindly Refresh</p>;
    // If there is an error, display the error message and suggest refreshing the page.
  }

  if (userInput) {
    return (
      <SearchResult userInput={userInput} filteredMovies={filteredMovies} />
    );
    // If there is user input (i.e., a search term), show the search results.
  }

  return (
    <div className="movie-body">
      {/* Main container for the home page content. */}
      <div className="tred-body">
        {/* Container for trending movies/shows. */}
        <h2 className="trend">Trending</h2>
        {/* Header for the trending section. */}
        <Trending {...{ data, error, loading, updateUI }} />
        {/* Renders the `Trending` component with props spread from the data, error, loading status, and update function. */}
      </div>

      <div className="main-body">
        {/* Container for recommended movies/shows. */}
        <h2 className="reco">Recommended For You</h2>
        {/* Header for the recommended section. */}
        <Recommended {...{ data, error, loading, updateUI }} />
        {/* Renders the `Recommended` component with props spread from the data, error, loading status, and update function. */}
      </div>
    </div>
  );
};

export default Home;
// Exports the `Home` component for use in other parts of the application.
