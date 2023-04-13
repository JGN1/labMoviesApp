import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import SiteHeader from './components/siteHeader'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMovies from "./pages/upcomingMovies";
// import PopularActors from "./pages/popularActors";
// import PopularActorsAuth from "./pages/popularActorsAuth";
// import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from 'react-query/devtools'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AuthProvider from "./contexts/authProvider";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PopularActorsPage from './pages/popularActors'
import ActorDetailsPage from './pages/actorDetailsPage'
// import Pagination from './hooks/usePagination.js'
import Pagination from './components/pagination'

// Following pages added for Authentication
import Register from "./pages/register"
import Login from "./pages/login"
// import Logout from "./pages/logout"
import AuthRoute from './components/authRoute'
// import AuthRoute from "./components/AuthRoute";
import Home from "./pages/home";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
            <Routes>
              {/* Items within the AuthRoute route element require authentication to access  */}
              <Route element={<AuthRoute />}>
                <Route path="/homeauth" element={<Home />} />
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pagination" element={<Pagination />} />
              {/* <Route path="/pagination" element={<Pagination/>} />    */}
              <Route path="/actors/profile/:id" element={<ActorDetailsPage />} />
              <Route path="/actors/popular" element={<PopularActorsPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMovies />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
