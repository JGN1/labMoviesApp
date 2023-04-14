import React from "react";
import { useAuth } from "../contexts/authProvider";
import Typography from "@mui/material/Typography";

const AuthUserDetails = () => {
  const { user } = useAuth();

  console.log("authuser "+ JSON.stringify(user))
  return(
  <>
    <Typography>
      User is Logged in.
    </Typography>
    <Typography>
      User's email address is 
    </Typography>
  </>
  )
};

export default AuthUserDetails;