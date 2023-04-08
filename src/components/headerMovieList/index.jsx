import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const Header = (props ) => {
  const title = props.title
  var page = props.title[1];
  console.log("Title - :" + props.title);
  console.log("Page - :" + props.title[1]);
  console.log("Props - :" + JSON.stringify(props));
  // setPage(3);
  // const [page, setPage] = React.useState(1);

  // const [page, setPage] = props.page
  // const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => {
    // setPage(value);
    page = value;
    console.log("Page - :" + page);
  };

  return (
    <Paper component="div" sx={styles.root}>     
      <IconButton
        aria-label="go back"
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton
        aria-label="go forward"
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>

      <Stack spacing={2}>
        {/* <Pagination count={10} shape="rounded" showFirstButton showLastButton  color="primary"  /> */}
        <Pagination count={10} shape="rounded" showFirstButton showLastButton  color="primary" page={page} onChange={handleChange}  />
      </Stack>      
    </Paper>
  );
};

export default Header;
