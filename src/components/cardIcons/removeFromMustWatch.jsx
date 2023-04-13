import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e) => {
    e.preventDefault();   
    console.log("Got into on User request removefromfavourites") 
    context.removeFromMustWatch(movie);
    // context.removeMustWatch(movie);
  };

return (
  <IconButton
    aria-label="remove from must watch"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromMustWatchIcon;
