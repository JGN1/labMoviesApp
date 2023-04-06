import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const styles = {
    root: {  
    display: "flex",
    // justifyContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 2,
    backgroundColor: "rgb(255, 255, 255)",
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const ActorHeader = (props) => {
  const actor = props.actor;
  // Get actors from local storage.
  const favourite = JSON.parse(localStorage.getItem("favourites"));   
  console.log("Hello this is favourite -- " + favourite);
  console.log("actor id from props " + actor.id);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      {favourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : null}
      <Typography variant="h4" component="h3">              
        {actor.title}{"   "}
        <a href={actor.name}>
          <HomeIcon color="primary"  fontSize="='large"/>
        </a>{"        "}
        <span>Actor Biography</span>
        {/* <span>{`${actor.name}`} </span> */}
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
