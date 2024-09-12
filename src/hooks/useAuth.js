import { useContext } from "react";
// Imports the `useContext` hook from React for accessing context values.

import AuthContext from "../context/AuthContext";
// Imports the `AuthContext` created in the `AuthContext` file.

const useAuth = () => {
  const authContext = useContext(AuthContext);
  // Uses the `useContext` hook to access the current value of `AuthContext`.

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
    // Throws an error if `authContext` is null or undefined,
    // indicating that `useAuth` is being used outside of an `AuthProvider`.
  }

  return authContext;
  // Returns the context value, which includes user data and authentication methods.
};

export default useAuth;
// Exports the `useAuth` hook for use in other components.
