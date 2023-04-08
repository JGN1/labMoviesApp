import React, {useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import { getPageMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
// import useMoviePagination from "../hooks/useMoviePagination";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  dateFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const relDateFiltering = {
  name: "relDate",
  value: "",
  condition: dateFilter,
};

const HomePage = (props) => {
  // const page = props.page;
  
  // const [page, setPage] = React.useState(1)
  const [page, setPage] = useState(1)

  const {data, error, isLoading, isError } = useQuery(['page', page], getPageMovies);
  // Original query for home page before adding pagination
  // const { data, error, isLoading, isError } = useQuery("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, relDateFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title={["Discover Movies",page]}
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        dateFilter={filterValues[2].value}
      />
    </>
  );
};

export default HomePage;
