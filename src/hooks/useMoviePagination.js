import { useEffect, useState } from "react";
import {getPageMovies} from '../api/tmdb-api'

const getPageMovies = page => {
  const [movies, setMovie] = useState(null);
  useEffect(() => {
    getPageMovies(page).then(movies => {
      setMovie(movies);
    });
  }, [page]);
  return [movies, setMovie];
};

export default getPageMovies
