import React from "react";
import PageTemplate from "../components/templateActorsListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getPopularActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddMustWatchIcon from '../components/cardIcons/addToMustWatch'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

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
  const { data, error, isLoading, isError } = useQuery("Popular Actors", getPopularActors);
  // const { filterValues, setFilterValues, filterFunction } = useFiltering(
  //   [],
  //   [titleFiltering, genreFiltering]
  // );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
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
