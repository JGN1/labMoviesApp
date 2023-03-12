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
  const favourite = true; 
  // const favourite = JSON.parse(localStorage.getItem("title")); 
  const favourites = localStorage.getItem("favourites"); 
  console.log("Hello this is favourite -- " + favourites);
  // const profileEmails = favourites.map((fav) => {
  //   return {
  //     name: `${fav.title} ${fav.id}`,
  //   };
  // });
  // console.log("here we go -- " + profileEmails);

  
  // const profileEmails = profiles.map((profile) => {
  //   return {
  //     name: `${profile.name.first} ${profile.name.last}`,
  //     email: profile.email,
  //   };
  // });
  // console.log(profileEmails);
  
  
  // console.log("Hello this is favouriteID -- " + favouriteId);
  console.log("movie id from props " + movie.id);
  // console.log("Hello this is favourite -- " + json.stringify(favourite));


  



  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      {favourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : null}
      {/* {favourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : <Avatar sx={styles.avatar}><ArrowForwardIcon /></Avatar>} */}
      <Typography variant="h4" component="h3">              
        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary"  fontSize="='large"/>
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};


// import Avatar from "@mui/material/Avatar";

// <CardHeader
//         sx={styles.header}
//         avatar={
//           movie.favourite ? (
//             <Avatar sx={styles.avatar}>
//               <FavoriteIcon />
//             </Avatar>
//           ) : null
//         }
//         title={
//           <Typography variant="h5" component="p">
//             {movie.title}{" "}
//           </Typography>
//         }
//       />


// const myFavIconfunction = () => {
  
//   // Get movies from local storage.
//   const movies = JSON.parse(localStorage.getItem("favourites")); 
//   console.log(movies);

//   const avatar = {
//     movies.favourite ? (
//       <Avatar sx={styles.avatar}>
//         <FavoriteIcon />
//       </Avatar>
//     ) : null
//   };
//   return avatar;
// }

export default MovieHeader;
