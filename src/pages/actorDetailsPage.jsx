import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import ActorFilmography from "../components/actorFilmography";
import PageTemplate from "../components/templateActorPage";
// import useMovie from "../hooks/useMovie";
import { getActor } from '../api/tmdb-api'
import { getActorCombinedCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'


const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],    
    getActor
    // getActorCombinedCredits
  );

  // const actor1 = useQuery("976", getActorCombinedCredits);
  // const { data: actor, error, isLoading, isError } = useQuery(
  //   ["actor", { id: id }],    
  //   // getActor
  //   getActorCombinedCredits
  // );

  // const { data: actorCredits, error, isLoading, isError } = useQuery(
  //   ["actorCredits", { id: id }],    
  //   // getActor
  //   getActorCombinedCredits
  // );  
  
  console.log("Here is contents first query - ");
  console.log(JSON.stringify(actor));
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // if (isLoading2) {
  //   return <Spinner />;
  // }

  // if (isError2) {
  //   return <h1>{error2.message}</h1>;
  // }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
          {/* <PageTemplate actor={actor} actorCredits={actorCredits}> */}
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
