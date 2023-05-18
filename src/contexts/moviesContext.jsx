import React, { useState } from "react";
import {apiAddReview} from "../api/ewd-api-jn-2023";

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

  // Added for assignment 2 so reviews can be sent to my MongoDB backend
  const addReview = (movie, review) => {   // NEW
    // console.log("In the add review in movie context");
    // console.log("Form Submission data");
    // console.log("------" + JSON.stringify(movie.id)+" -- "+JSON.stringify(movie.original_title)+" -- "+ JSON.stringify(review.author)+" -- "+ JSON.stringify(review.review)+" -- "+ JSON.stringify(review.rating));
    // apiAddReview(11111,"Grapes of Wrath", "john higgins","this is the review text for testing from movies React App", 3);
    apiAddReview(movie.id, movie.original_title, review.author, review.review, review.rating);
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
