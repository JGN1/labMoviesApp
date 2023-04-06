import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from '@mui/icons-material/Place';
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import CakeIcon from '@mui/icons-material/Cake';
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'

const styles = {
  chipSet: {
    display: "flex",
    listStyle: "none",
    padding: 1.3,
    margin: 1,
  },
  chipLabel: {
    display: "flex",
    marginRight: 1,
    marginLeft: 5,
    listStyle: "none",
  },
  chipPaper: {
    padding: 1.3,
    margin: 1,
    backgroundColor: "#bfbfbf",
  },
  fab: { 
    position: "fixed",
    top: 80,
    right: 20,
  },
};

const ActorDetails = ( {actor}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>
    {/* <Paper component="ul" sx={styles.bioSpace}> */}
      <Typography variant="h3" component="h3">
        {actor.name}
      </Typography>

      <Typography variant="h6" component="p"  mt={2}>
        {actor.biography}
      </Typography>
      {/* </Paper> */}
      <Paper component="ul" sx={styles.chipSet} >
        <li>
          <Chip icon={<PlaceIcon />}  label="Place of birth" color="primary" sx={styles.chipLabel} />
        </li>
        <li>
        <Chip label={`${actor.place_of_birth}`} />
        </li>
        <li>
          <Chip icon={<CakeIcon />}  label="Date of Birth" color="primary"  sx={styles.chipLabel} />
        </li>
        <li>
            <Chip label={`${actor.birthday}`}/>
        </li>
        <li>
          <Chip icon={<StarRate />}  label="Popularity Rating" color="primary"  sx={styles.chipLabel} />
        </li>  
        <li>
        <Chip label={`Popularity ${actor.popularity}`}/>  
        </li>
        </Paper>
        <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Also Known As" color="primary"  sx={styles.chipLabel} />
        </li>
        {actor.also_known_as.map((g) => (
          <li key={g}>
            <Chip label={g}  />
          </li>
        ))}
      </Paper>
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews actor={actor} />
      </Drawer>
    </>
  );
};
export default  ActorDetails ;
