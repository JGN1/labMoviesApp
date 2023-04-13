import React, { useState } from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
//New
import { useAuth } from '../../contexts/authProvider';
import { supabase } from "../../supabase/client";

const styles = {
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  // offset: theme.mixins.toolbar,
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  //New vvvvvvvvvvvvvvvvvvvvvvv
  // const context = useContext(useAuth);

  const { auth, signOut } = useAuth();
  console.log ("here is Auth hdhd - " + auth);
  console.log(auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      //signOut();
      const { error } = await signOut();
      // context.signOut()
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
    //^^^^^^^^^^^^^^^^^

  const menuOptions = [
    { label: "Home", path: "/" },    
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Popular Actors", path: "/actors/popular" },
    { label: "Maybe TV???", path: "/" },
    { label: "Auth Actors", path: "/actors/popularAuth" },
    { label: "HomeAuth", path: "/homeauth" },    
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >                
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                {!auth && (
                    <MenuItem
                    key={"Login"}
                    onClick={() => handleMenuSelect("/login")}                     
                  >
                    Login1
                  </MenuItem>
                )}
                {auth && (
                // <MenuItem onClick={() => handleLogout()}>
                <MenuItem onClick={handleLogout}>                
                  Logout
                </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              {!auth && (
              <Button onClick={() => handleMenuSelect("/login")} style={{color: 'white'}}>
              {/* <Button onClick={() => handleLogout()}> */}
                  Login
                </Button>
              )}
              {/* {auth && ( */}
              <Button onClick={handleLogout} style={{color: 'white'}}>
              {/* <Button onClick={() => handleLogout()}> */}
                  Logout
                </Button>
              {/* )} */}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />

      {/* <div className={classes.offset} /> */}
    </>
  );
};

export default SiteHeader;
