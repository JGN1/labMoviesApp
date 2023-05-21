import React from "react";
import PageTemplate from "../components/templateActorsListPage";
// import { useQuery } from "react-query";
import { useQuery, QueryClient } from "@tanstack/react-query";
import Spinner from "../components/spinner";
// import { getPopularActors } from "../api/ewd-api-jn-2023";
import { getPopularActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddMustWatchIcon from '../components/cardIcons/addToMustWatch'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const queryClient = new QueryClient()

// const titleFiltering = {
//   name: "title",
//   value: "",
//   condition: titleFilter,
// };
// const genreFiltering = {
//   name: "genre",
//   value: "0",
//   condition: genreFilter,
// };

const PopularActors = (props) => {
 //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 const [page, setPage] = React.useState(1)
 const changePage = (pgNo) => {
   setPage(pgNo);
 };

 const { status, data, error, isFetching, isPreviousData } = useQuery({
   queryKey: ['Popular Actors', page],
   queryFn: getPopularActors,
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

 // Original query for home page before adding pagination

  // const { data, error, isLoading, isError } = useQuery(["Popular Actors"], getPopularActors);
  // const { filterValues, setFilterValues, filterFunction } = useFiltering(
  //   [],
  //   [titleFiltering, genreFiltering]
  // );

  if (isFetching) {
    return <Spinner />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  // const changeFilterValues = (type, value) => {
  //   const changedFilter = { name: type, value: value };
  //   const updatedFilterSet =
  //     type === "title"
  //       ? [changedFilter, filterValues[1]]
  //       : [filterValues[0], changedFilter];
  //   setFilterValues(updatedFilterSet);
  // };

  const actors = data ? data.results : [];
  // const displayedActors = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Popular Actors"
        actors={actors}
        changePage={changePage}
        page={page}
        // actors={displayedActors}
        action={(actor) => {
          return <AddMustWatchIcon movie={actor} /> 
          // return <PlayListAddIcon movie={movie} />          
          // return <AddToFavouritesIcon movie={movie} />          
        }}
      />
      {/* <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      /> */}
    </>
  );
};

export default PopularActors;
