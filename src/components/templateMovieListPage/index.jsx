import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import MovieAuth from "../auth";


const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  item: {
    textAlign: 'center',
  },
};

function MovieListPageTemplate({ movies, title, changePage, page, action }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} page={page} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies} />
      </Grid>
      <Grid item container sx={styles.item}>
        <Grid item xs={2} style={{ alignItems: 'center' }}>
          <MovieAuth />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
