import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )  // NEW
  const [favourites, setFavourites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); //New for must Watch - Lab 4 Exercise 4

  //New for must Watch - Lab 4 Exercise 4  
  const addToMustWatch = (movie) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
  };

  //New for must Watch - Lab 4 Exercise 4
  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        addReview,    // NEW
        addToMustWatch, //New for must Watch - Lab 4 Exercise 4 
        removeFromMustWatch, //New for must Watch - Lab 4 Exercise 4 
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
