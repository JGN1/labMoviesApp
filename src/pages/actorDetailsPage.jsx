import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import ActorFilmography from "../components/actorFilmography";
import PageTemplate from "../components/templateActorPage";
import { getActor } from '../api/tmdb-api'
// import { useQuery } from "react-query";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'


const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],    
    getActor
  );
  
  console.log("Here is contents first query - ");
  console.log(JSON.stringify(actor));
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor}/>
            <ActorFilmography actor={actor}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
