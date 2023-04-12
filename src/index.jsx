import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import SiteHeader from './components/siteHeader'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMovies from "./pages/upcomingMovies";
import PopularActors from "./pages/popularActors";
import PopularActorsAuth from "./pages/popularActorsAuth";
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
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PopularActorsPage from './pages/popularActors'
import ActorDetailsPage from './pages/actorDetailsPage'
// import Pagination from './hooks/usePagination.js'
import Pagination from './components/pagination'

// Adding following for Supabase Authentication

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
// const [session, setSession] = useState(null);

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
        <SiteHeader />      {/* New Header  */}
        <MoviesContextProvider>
          <Routes>
            {/* <Route path="/auth" element={<Authentication/>} />   */}
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/actors/profile/:id" element={<ActorDetailsPage />} />
            <Route path="/actors/popular" element={<PopularActorsPage />} />
            <Route path="/actors/popularAuth" element={<PopularActorsAuth supabase={supabase} />} />
            {/* <Route path="/actors/popularAuth" element={<PopularActorsAuth supabase={supabase} session={session} setSession={setSession}/>} />       */}
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMovies />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
