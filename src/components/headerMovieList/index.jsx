import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
  item: {
    textAlign: 'center',
  },
};

const Header = (props) => {
  const title = props.title;
  const page = props.page

  const handleChange = (event, value) => {
    props.changePage(value);
  };

  return (
    <Paper component="div" sx={styles.root}>
      <Grid container sx={styles.item}>
        <Grid item xs={9} style={{alignItems: 'center'}}>
          <Typography variant="h4" component="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2}>
            <Pagination count={10} shape="rounded" showFirstButton showLastButton color="primary" page={page} onChange={handleChange} />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
