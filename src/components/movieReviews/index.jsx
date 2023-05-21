import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { getApiMovieReviews } from "../../api/ewd-api-jn-2023";

const styles = {
  table: {
    minWidth: 550,
  },
};

export default function MovieReviews({ movie }) {
  // const [reviews, setReviews] = useState({});
  const [reviews, setReviews] = useState([]);
  const [checkResponse, setCheckResponse] = useState(false);
  const [responseComment, setResponseComment] = useState();
  const [responseLink, setResponseLink] = useState();
  const [responseLinkText, setResponseLinkText] = useState();
  const [responseState, setResponseState] = useState();


  useEffect(() => {
    if (import.meta.env.VITE_AUTH_API == "MONGODB") {
      try {
        getApiMovieReviews(movie.id).then((rev) => {

          setReviews(rev);
          const authToken = localStorage.getItem('token');
          try {
            var accessToken = authToken.split(" ")[0];
          } catch (error) {
            var accessToken = 'NotLoggedIn';
          }
          // const accessToken = authToken.split(" ")[0];
          
          console.log("AuthToken - " + authToken);
          console.log("Reviews - " + JSON.stringify(reviews));
          console.log("Rev from API" + JSON.stringify(rev));
          console.log("AccessToken - " + accessToken);
          console.log("Rev MESSAGE from API " + JSON.stringify(rev.error));

          if (rev.length > 0 && accessToken == 'BEARER') {
            setCheckResponse(true);
            console.log("Reviews exist and logged in");
          };
          if (rev.error == "Error: Verification Failed jwt must be provided") {
            setCheckResponse(false);
            setResponseComment("To see your Reviews Please Log In");
            setResponseLink("/login");
            setResponseLinkText("Login");
            console.log(" JWT ERROR - Reviews Please Log IN");
          };
          if ((rev.length == 0 && authToken == null)|(rev.length > 0 && authToken == null)) {
            setCheckResponse(false);
            setResponseComment("To see your Reviews Please Log In");
            setResponseLink("/login");
            setResponseLinkText("Login");
            console.log(" Reviews Please Log IN");
          };
          if (rev.length == 0 && accessToken == 'BEARER') {
            setCheckResponse(false);
            setResponseLink("/reviews/form");
            setResponseState("state={{movieId: movie.id,}}")
            setResponseLinkText("Add Review");
            setResponseComment("You have not added any reviews yet");
            console.log(" no reviews yet");
          };
          console.log("CheckResponse is set to - " + checkResponse);
          console.log("ResponseComment is set to - " + responseComment);
        });
      } catch (error) {
        setResponseComment("To see your Reviews Please Log In");
        setCheckResponse(false);
      }
    }

    if (import.meta.env.VITE_AUTH_API == "SUPABASE") {
      getMovieReviews(movie.id).then((rev) => {
        setReviews(rev);
        setCheckResponse(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            checkResponse ? (
              reviews.map((r) => (
                <TableRow key={r.id}>
                  <TableCell component="th" scope="row">
                    {r.author}
                  </TableCell>
                  <TableCell >{excerpt(r.content)}</TableCell>
                  <TableCell >
                    <Link
                      to={`/reviews/${r.id}`}
                      state={{
                        review: r,
                        movie: movie,
                      }}
                    >
                      Full Review
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key='1'>
                <TableCell component="th" scope="row">
                  {<Link to={`${responseLink}`}
                    state={{
                      movieId: movie.id,
                    }}
                    >
                    {responseLinkText}</Link>}
                </TableCell>
                <TableCell >{responseComment}</TableCell>
                <TableCell >

                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



  // console.log("HERE IS THE REVIEW RETRIEVED - " + JSON.stringify(reviews));


  // if(reviews.content !== undefined){setCheckResponse(true)};
  // setCheckResponse(false);


  // return (
  //   <TableContainer component={Paper}>
  //     <Table sx={styles.table} aria-label="reviews table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell >Author</TableCell>
  //           <TableCell align="center">Excerpt</TableCell>
  //           <TableCell align="right">More</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         { reviews.map((r) => (
  //               <TableRow key={r.id}>
  //                 <TableCell component="th" scope="row">
  //                   {r.author}
  //                 </TableCell>
  //                 <TableCell >{excerpt(r.content)}</TableCell>
  //                 <TableCell >
  //                   <Link
  //                     to={`/reviews/${r.id}`}
  //                     state={{
  //                       review: r,
  //                       movie: movie,
  //                     }}
  //                   >
  //                     Full Review
  //                   </Link>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );

