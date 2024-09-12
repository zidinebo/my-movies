import React, { useEffect } from "react";
// Imports React and the `useEffect` hook from the React library for side effects.
import { Outlet } from "react-router-dom";
// Imports the `Outlet` component to render child routes.
import SideBar from "../components/SideBar/SideBar";
// Imports the `SideBar` component for navigation.
import Search from "../components/Search/Search";
// Imports the `Search` component for search functionality.
import useAuth from "../hooks/useAuth";
// Imports the custom `useAuth` hook for authentication handling.

const RootLayout = () => {
  const { handleGetUser } = useAuth();
  // Destructures `handleGetUser` function from the `useAuth` hook.

  useEffect(() => {
    handleGetUser();
    // Calls `handleGetUser` when the component mounts to fetch user data.
  }, [handleGetUser]);

  return (
    <div>
      <SideBar />
      {/* Renders the `SideBar` component on the left side of the layout. */}
      <div>
        <Search />
        {/* Renders the `Search` component for searching functionality. */}
        <Outlet />
        {/* `Outlet` renders the matched child route components within this layout. */}
      </div>
    </div>
  );
};

export default RootLayout;
// Exports the `RootLayout` component for use in other parts of the application.
