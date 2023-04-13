import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import CardActionArea from '@mui/material/CardActionArea';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  avatarPlaylist: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function ActorCard({ actor, action }) {

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <Typography variant="h5" component="p">
            {actor.name}{" "}
          </Typography>
        }
      />
      <CardActionArea>
        <Link to={`/actors/profile/${actor.id}`}>
          <CardMedia
            sx={styles.media}
            image={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : img
            }
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <CardActions disableSpacing>
              {/* {action(actor)} */}
              <Link to={`/actors/profile/${actor.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="medium" color="primary">
                  More Info
                </Button>
              </Link>
            </CardActions>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {actor.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
}
