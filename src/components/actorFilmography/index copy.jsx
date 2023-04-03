import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorCombinedCredits } from '../../api/tmdb-api'
import Spinner from '../spinner'


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'

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
      <Typography variant="h4" component="h3" mt={2}>
        Filmography
      </Typography>


      {actorCreds ? (
        <>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            {actorCreds.cast.map((data) => (
              <>
                <Card sx={styles.card}>
                  <CardHeader
                    sx={styles.header}
                    // avatar={
                    //   actor.favourite ? (
                    //     <Avatar sx={styles.avatar}>
                    //       <FavoriteIcon />
                    //     </Avatar>
                    //   ) : actor.mustWatch ? (
                    //         <Avatar sx={styles.avatar}>
                    //           <PlaylistAddCheckIcon />
                    //         </Avatar>
                    //       ) : null
                    // }
                    title={
                      <Typography variant="h5" component="p">
                        {data.original_title}{" "}
                      </Typography>
                    }
                  />
                  <CardMedia
                    sx={styles.media}
                    image={
                      data.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                        : img
                    }
                  />
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {"Character - "}{data.character}{" "}
                    </Typography>
                    {/* <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6" component="p">
                      <CalendarIcon fontSize="small" />
                      {actor.release_date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" component="p">
                      <StarRateIcon fontSize="small" />
                      {"  "} {actor.popularity}{" "}
                    </Typography>
                  </Grid>
                </Grid> */}
                  </CardContent>
                  <CardActions disableSpacing>
                    {/* {action(actor)}
                <Link to={`/actors/profile/${actor.id}`}>        
                  <Button variant="outlined" size="medium" color="primary">
                    More Info ...
                  </Button>
                </Link> */}
                  </CardActions>
                </Card>
              </>
            ))}
          </Grid>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )
      }
    </>
  );

};
export default ActorFilmography;
{/* <Typography key={data} variant="h5" component="h3">
            {data.original_title}
            </Typography> */}