import React, { useContext  } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MoviesContext } from "../../contexts/moviesContext";
import img from '../../images/film-poster-placeholder.png';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddToFavouritesIcon from '../cardIcons/addToFavourites';
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const styles = {
  card: { maxWidth: 500 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  avatarPlaylist: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};


export default function ActorFilmCard({actorCredits}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { favourites, addToFavourites } = useContext(MoviesContext);
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  if (favourites.find((id) => id === actorCredits.id)) {
    actorCredits.favourite = true;
  } else {
    actorCredits.favourite = false
  }

  if (mustWatch.find((id) => id === actorCredits.id)) {
    actorCredits.mustWatch = true;
  } else {
    actorCredits.mustWatch = false
  }

  console.log("======================================");
  console.log(JSON.stringify(actorCredits));
  console.log("======================================");

  return (
    <Card sx={{ maxWidth: 500 }}  variant="outlined">
      <CardHeader
        avatar={
          actorCredits.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : actorCredits.mustWatch ? (
                <Avatar sx={styles.avatar}>
                  <PlaylistAddCheckIcon />
                </Avatar>
              ) : null
        }
        title={
          actorCredits.original_title
              ? actorCredits.original_title
              : actorCredits.original_name
          }           
      />
      <CardActionArea>
      <Link to={`/movies/${actorCredits.id}`}>
      <CardMedia
        component="img"
        height="350"
        image={
          actorCredits.poster_path
              ? `https://image.tmdb.org/t/p/w500/${actorCredits.poster_path}`
              : img
          }
        alt={`https://image.tmdb.org/t/p/w500/${actorCredits.poster_path}`}
      />
      </Link>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {
          actorCredits.release_date
              ? `Release Date - ${actorCredits.release_date}`
              : `First Aired - ${actorCredits.first_air_date}`
          }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Character - ${actorCredits.character}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {actorCredits.media_type=="tv"
          ? `TV Series`
          : `Movie`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddToFavouritesIcon movie={actorCredits} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent> 
          <Typography paragraph>{actorCredits.overview} </Typography>          
        </CardContent>
      </Collapse>
    </Card>
  );
}