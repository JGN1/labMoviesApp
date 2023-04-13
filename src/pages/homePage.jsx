import React, {useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
// import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import { getPageMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  dateFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import usePagination from "../hooks/usePagination";
const queryClient = new QueryClient()


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
 
  //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  const [page, setPage] = React.useState(1)
  const changePage = (pgNo) => {
    setPage(pgNo);
  };

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['pageMovies', page],
    queryFn: getPageMovies,
    keepPreviousData: true,
    staleTime: 5000,
  })

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
        queryClient.prefetchQuery({
        queryKey: ['pageMovies', page + 1],
        queryFn: getPageMovies,
      })
    }
  }, [data, isPreviousData, page, queryClient])

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // const {data, error, isLoading, isError } = useQuery(['page', page], getPageMovies);

  // Original query for home page before adding pagination
  // const { data, error, isLoading, isError } = useQuery("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, relDateFiltering]
  );

  if (isFetching) {
    // if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    // if (isError) {
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
        title={["Discover Movies"]}
        // title={["Discover Movies",page]}
        movies={displayedMovies}
        changePage={changePage}
        page={page}
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
