import { useEffect, useState } from "react";
// Imports React hooks: `useEffect` for handling side effects and `useState` for managing state.
import { useSearchParams } from "react-router-dom";
// Imports `useSearchParams` from `react-router-dom` to access and manage URL search parameters.

export const useCustomParams = (data) => {
  const [searchParams] = useSearchParams();
  // Retrieves the current URL search parameters.

  const [filteredMovies, setFilteredMovies] = useState([]);
  // Initializes a state variable `filteredMovies` to store movies filtered based on search input.

  const userInput = searchParams.get("search") ?? "";
  // Gets the value of the "search" parameter from the URL. Defaults to an empty string if not found.

  useEffect(() => {
    if (data) {
      // Ensures that `data` is defined before performing any operations.

      const searchedMovies = data.filter(
        (movie) => movie.title.toLowerCase().includes(userInput.toLowerCase())
        // Filters movies based on whether the `title` includes the `userInput`, ignoring case.
      );

      setFilteredMovies(searchedMovies);
      // Updates the `filteredMovies` state with the list of movies that match the search input.
    }
  }, [searchParams, data, userInput]);
  // `useEffect` runs whenever `searchParams`, `data`, or `userInput` changes.

  return { userInput, filteredMovies };
  // Returns `userInput` and `filteredMovies` so they can be used by the component that calls this hook.
};
