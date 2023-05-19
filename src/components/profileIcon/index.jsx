import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/authProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// const providerPath = import.meta.env.VITE_AUTHPROVIDER_PATH;
// console.log ("this is providerPath " + providerPath);
// const { useAuth } = await import('../contexts/authProvider_API');

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [displayName, setName] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  console.log("passed email - " + props.user)
  
  const { auth, signOut, signout } = useAuth();
  const { user } = useAuth();
  console.log ("In profileIcon component, auth is - " + auth);
  {auth && (
  console.log ("In profileIcon component, user - " + user)
  )}
  console.log(auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signout();      
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  // setName = props.user;

  if (import.meta.env.VITE_AUTH_API == "SUPABASE") {
    // setName = props.user;
    var displayName = props.user;
  }
  if (import.meta.env.VITE_AUTH_API == "MONGODB") {
    // setName = user;
    var displayName = user;
  }

  

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={props.user}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><AccountCircleIcon /></Avatar>
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}            
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>        
          <Avatar /> {displayName}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}