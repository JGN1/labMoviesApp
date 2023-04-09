import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
// import { useQueries } from "react-query";
import { useQueries } from '@tanstack/react-query';
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
// import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  dateFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const relDateFiltering = {
  name: "relDate",
  value: "",
  condition: dateFilter,
};

const FavouriteMoviesPage = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  console.log(JSON.stringify({favourites: movieIds}));
  console.log(JSON.stringify({movieIds}));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, relDateFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries({
      queries: movieIds.map((movieId) => {
      console.log("This is the favourites mapping - " +movieId);
      return {        
        queryKey: ['movie', {id: movieId}],
        queryFn: getMovie,
      }
    }),
  })

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  // const toDo = () => true;

  // const changeFilterValues = (type, value) => {
  //   const changedFilter = { name: type, value: value };
  //   const updatedFilterSet =
  //     type === "title"
  //       ? [changedFilter, filterValues[1]]
  //       : [filterValues[0], changedFilter];
  //   setFilterValues(updatedFilterSet);
  // };

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =    
    type === "title"
        ? [changedFilter, filterValues[1], filterValues[2]]
        : type === "genre"
        ? [filterValues[0], changedFilter, filterValues[2]]
        : type === "relDate"
        ? [filterValues[0], filterValues[1], changedFilter]
        : [filterValues[0], filterValues[1], changedFilter[2]];
    setFilterValues(updatedFilterSet);
    console.log("this is updatedfilterset - " + JSON.stringify(updatedFilterSet));
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
