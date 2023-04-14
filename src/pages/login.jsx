import React, { useRef, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CardHeader, Container, FormControl, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

const styles = {
  cardHeader: {
    backgroundColor: "#1976d2",
    color: "#fff"
  },
  card: {
    maxWidth: 450,
  },
  gridStyles: {
    paddingBottom: 1,
    paddingRight: 2,
    paddingLeft: 1,
    marginTop: 1,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 500
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  },
  boxStyles: {
    paddingBottom: 1,
    paddingTop: 3,
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    m: 2,
    width: '40ch'
  },
  button: {
    m: 2,
    width: '41ch',
  }
};

const Login = (props) => {
  console.log("Login Props - " + JSON.stringify(props));
  const emailRef = useRef();
  const passwordRef = useRef();
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      // console.log("Email Ref value " + emailRef.current.value)
      // console.log("Password Ref value " + passwordRef.current.value)
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  // Following for show password in text field
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container sx={styles.container}>
        <Card sx={styles.card} variant="outlined">
          <CardHeader title="TMDB Client - User Login" sx={styles.cardHeader} />
          <CardContent>
            <Box sx={styles.boxStyles} component="form" onSubmit={handleSubmit} >
              <FormControl sx={styles.formControl} variant="outlined"
                type='email'
                required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type='text'
                  inputRef={emailRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  }
                  label="Email"
                />
              </FormControl>
              <FormControl sx={styles.formControl} variant="outlined"
                required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  inputRef={passwordRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {errorMsg && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorMsg("")}
                  dismissible>
                  {errorMsg}
                </Alert>
              )}
              <div className="text-center mt-2">
                <Button variant="contained" sx={styles.button} disabled={loading} type="submit" >
                  Login
                </Button>
              </div>
              <Grid container sx={styles.gridStyles}>
                <Grid item xs>
                  <Typography>
                    <Link to={"/register"}>
                      Forgot password?
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <Link to={"/register"}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;