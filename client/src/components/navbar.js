import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    flexGrow: 1,    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 700,
  },
}));

const NavBtns = (numOfNotifs) => {
  let location = useLocation();
  
  if(location.pathname === "/") {
    return(
      <div>
        <Button color="inherit" style={{fontSize: 20}} component={Link} to="/login">Login</Button>
        <Button color="inherit" style={{fontSize: 20}}  component={Link} to="/signup">Sign Up</Button>
      </div>
    );
  }
  else if(location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/ProfileSetup_Student" && location.pathname !== "/ProfileSetup_Prof") {
    return(
      <div style={{ 
        display: "flex",
        paddingRight: 20,
        paddingLeft: 20,
      }}>
        <Badge 
          color="secondary" 
          badgeContent={numOfNotifs} 
          component={Link} 
          to="/notifications"
          style={{ 
            marginRight: 20,
            color: "black"
          }}
        >
          <NotificationsIcon />
        </Badge>
        <Link 
          to="/profile" 
          style={{ 
            marginRight: 20,
            color: "black"
          }}
        >
          <AccountCircleIcon />
        </Link> 
        <Link 
          to="/"
          style={{ 
            color: "black",
            textDecoration: "none"
          }}
        >
          Logout
        </Link>
      </div>
    );
  }
}

const Navbar = ({ numOfNotifs }) => {
  const classes = useStyles();
  
  return(
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} color='inherit'>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link 
                to="/" 
                className="nav-brand" 
                style={{ 
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                FindSpace
              </Link>
            </Typography>
            { NavBtns(numOfNotifs) }
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default Navbar;