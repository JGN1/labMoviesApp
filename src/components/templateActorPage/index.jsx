import React from "react";  // useState/useEffect redundant 
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getActorImages } from "../../api/tmdb-api";
// import { useQuery } from "react-query";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
    // padding: "15px",
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
};

const TemplateActorPage = ({ actor, actorCredits, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: actor.id }],
    getActorImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.profiles

  console.log("about to print it - ");
  console.log(JSON.stringify(actorCredits));

  return (
    <>
      {/* <ActorHeader actor={actor} /> */}
      {/* // Changed this to get background grey */}
      <Grid container spacing={5} sx={styles.root}>
        <Grid item xs={20}>
          <ActorHeader actor={actor} />
        </Grid>
        <Grid item xs={2}>
          <div sx={styles.gridListRoot}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
