import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

function ActorListPageTemplate({ actors, title, page, changePage, action }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={20}>
        <Header title={title} changePage={changePage} page={page}/>
      </Grid>
      <Grid item container spacing={5}>
      <ActorList action={action} actors={actors} />
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;
