import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { MoviesContext } from "../../contexts/moviesContext";


const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader = (props) => {
  const movie = props.movie;
  const { favourites, addToFavourites } = useContext(MoviesContext);
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false
  }
  
  return (
    <Paper component="div" sx={styles.root}>
    <Typography>
      {movie.favourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : null}
    </Typography>
      <Typography variant="h4" component="h3">
        {movie.title}{"   "}
        <br />
        <span>{`${movie.tagline}`} </span>
        <a href={movie.homepage} target="_blank">
          <MovieFilterOutlinedIcon color="primary" fontSize="='large" />
        </a>
      </Typography>
      <Typography>
        {movie.mustWatch ? <Avatar sx={styles.avatar}><PlaylistAddCheckIcon /></Avatar> : null}
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
