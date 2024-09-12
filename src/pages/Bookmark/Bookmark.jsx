import React from "react";
// Imports React library for building the UI.
import { useFetch } from "../../hooks/useFetch";
// Imports custom hook `useFetch` for data fetching.
import MovieCard from "../../components/MovieCard/MovieCard";
// Imports `MovieCard` component to display individual movies.
import useAuth from "../../hooks/useAuth";
// Imports custom hook `useAuth` for authentication handling.
import { useCustomParams } from "../../hooks/useCustomParams";
// Imports custom hook `useCustomParams` for filtering movies based on search params.
import Loading from "../../utils/Loading";
// Imports `Loading` component to display a loading indicator.
import SearchResult from "../Home/SearchResult";
// Imports `SearchResult` component to display search results.
import "./Bookmark.css";
// Imports CSS file for styling the component.

const Bookmark = () => {
  const { token } = useAuth();
  // Destructures `token` from the `useAuth` hook.

  // Uses `useFetch` hook to fetch bookmarked movies. Passes the API endpoint and token.
  const {
    data,
    error,
    loading,
    updateUI: handleBookmarkUpdate,
  } = useFetch("/api/bookmark", token);

  // Uses `useCustomParams` hook to filter movies based on user input from search params.
  const { userInput, filteredMovies } = useCustomParams(data);

  if (loading) {
    return <Loading />;
    // Displays the `Loading` component while data is being fetched.
  }

  if (error) {
    return <p>{error}</p>;
    // Displays the error message if there's an issue with data fetching.
  }

  if (userInput) {
    return (
      <SearchResult userInput={userInput} filteredMovies={filteredMovies} />
      // Renders `SearchResult` component if there's a search query, passing filtered movies and user input.
    );
  }

  return (
    <div className="bokpage">
      {/* Container for the bookmarked shows page. */}
      <h2>Bookmarked Shows</h2>
      {/* Header for the bookmarked shows section. */}
      <div className="bokmovpa">
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              updateUI={handleBookmarkUpdate}
            />
            // Maps over the `data` array to render `MovieCard` components for each bookmarked movie.
          ))
        ) : (
          <p className="text-white text-start">No bookmarked shows found.</p>
          // Displays a message if there are no bookmarked shows.
        )}
      </div>
    </div>
  );
};

export default Bookmark;
// Exports the `Bookmark` component for use in other parts of the application.
