import "./App.css";
// Imports the CSS file for styling the `App` component.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Imports components from `react-router-dom` for handling routing in the application.
// `Router` is the component that provides routing functionality.
// `Routes` is a container for `Route` elements that define different paths and their corresponding components.
// `Route` is used to define individual routes and their associated components.

import "bootstrap/dist/css/bootstrap.min.css";
// Imports Bootstrap CSS for using Bootstrap styles in the application.

import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TvSeries from "./pages/TvSeries/TvSeries";
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/SignUp/SignUp";
import Bookmark from "./pages/Bookmark/Bookmark";
import Error from "./pages/Error/Error";
// Imports page components for different routes.

import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
// Imports layout components that define the structure of the application for different groups of routes.

import { AuthProvider } from "./context/AuthContext";
// Imports `AuthProvider` from `AuthContext`, which provides authentication context to components.

import { Toaster } from "react-hot-toast";
// Imports `Toaster` from `react-hot-toast` for displaying toast notifications.

import PrivateRoute from "./utils/PrivateRoute";
// Imports `PrivateRoute`, a utility component for protecting routes that require authentication.

function App() {
  return (
    <>
      <Router>
        {/* The Router component provides routing functionality for the application. */}

        <Toaster position="top-right" />
        {/* The Toaster component is used to display toast notifications in the top-right corner. */}

        <AuthProvider>
          {/* The AuthProvider component provides authentication context to the entire application. */}

          <Routes>
            {/* The Routes component contains all the Route elements and handles the routing logic. */}

            <Route element={<RootLayout />}>
              {/* Defines a route that renders `RootLayout` as the layout component. */}

              <Route path="/" element={<Home />} />
              {/* Defines the route for the home page (`/`), which renders the `Home` component. */}

              <Route path="/movies" element={<Movies />} />
              {/* Defines the route for the movies page (`/movies`), which renders the `Movies` component. */}

              <Route path="/tvseries" element={<TvSeries />} />
              {/* Defines the route for the TV series page (`/tvseries`), which renders the `TvSeries` component. */}

              <Route element={<PrivateRoute />}>
                {/* Defines a route that uses `PrivateRoute` to protect access to the route. */}

                <Route path="/bookmark" element={<Bookmark />} />
                {/* Defines the route for the bookmark page (`/bookmark`), which renders the `Bookmark` component. */}
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              {/* Defines a route that renders `AuthLayout` as the layout component for authentication pages. */}

              <Route path="/signin" element={<SignIn />} />
              {/* Defines the route for the sign-in page (`/signin`), which renders the `SignIn` component. */}

              <Route path="/signup" element={<SignUp />} />
              {/* Defines the route for the sign-up page (`/signup`), which renders the `SignUp` component. */}
            </Route>

            <Route path="*" element={<Error />} />
            {/* Defines a catch-all route for any undefined paths, rendering the `Error` component. */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
// Exports the `App` component as the default export for use in other parts of the application.
