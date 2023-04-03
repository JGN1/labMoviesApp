import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorCombinedCredits } from '../../api/tmdb-api'
import Spinner from '../spinner'
import Grid from "@mui/material/Grid";
import ActorFilmCard from "../actorFilmCard";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.3,
    margin: 0,
  },
  chipLabel: {
    margin: 0.3,
  },
  fab: {
    position: "fixed",
    top: 80,
    right: 2,
  },
  card: { maxWidth: 345 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  avatarPlaylist: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const ActorFilmography = () => {

  const { id } = useParams();
  const { data: actorCreds, error, isLoading, isError } = useQuery(
    ["actor1122", { id: id }],
    getActorCombinedCredits
  );

  console.log("Here is contents Second query - ");
  console.log(JSON.stringify(actorCreds));
  console.log(JSON.stringify(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Box>
        <Paper variant="outlined" elevation={1} style={{ padding: "15px" }}>

          <Typography variant="h4" component="h3" mt={2}>
            Filmography
          </Typography>

          {actorCreds ? (
            <>
              {actorCreds.cast.map((data) => (
                <>
                <Grid item
                  container 
                  spacing={5} 
                  style={{ padding: "15px" }}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  >
                    <Grid key={data.id} item xs={12} sm={6} md={4} lg={3} xl={2} direction="row">
                      <ActorFilmCard key={data.id} actorCredits={data} />
                    </Grid>
                  </Grid>
                </>
              ))}
            </>
          ) : (
            <p>Waiting for actor details</p>
          )
          }

        </Paper>
      </Box>
    </>
  );

};
export default ActorFilmography;