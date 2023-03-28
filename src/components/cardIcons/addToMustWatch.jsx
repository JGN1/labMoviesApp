import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlayListAddIcon from "@mui/icons-material/PlaylistAdd";

const AddMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    // context.addToFavourites(movie);
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <PlayListAddIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default AddMustWatchIcon;
