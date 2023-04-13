import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';


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
  // Get movies from local storage.
  const favourite = JSON.parse(localStorage.getItem("favourites"));

  return (
    <Paper component="div" sx={styles.root}>     
      {favourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : null}
      <Typography variant="h4" component="h3">
        {movie.title}{"   "}        
        <br />
        <span>{`${movie.tagline}`} </span>
        <a href={movie.homepage} target="_blank">
          <MovieFilterOutlinedIcon color="primary" fontSize="='large" />
        </a>
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
