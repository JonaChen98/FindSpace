import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 30,
  },
}));

const NavBtns = (home, numOfNotifs) => {
  
  if(home) {
    return(
      <div>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
      </div>
    );
  }
  else {
    return(
      <div>
        <Badge color="secondary" badgeContent={numOfNotifs} component={Link} to="/notifications">
          <NotificationsIcon />
        </Badge>
        <Link to="/profile">
          <AccountCircleIcon />
        </Link> 
        <Link to="/">Logout</Link>
      </div>
    );
  }
}

const Navbar = ({ home, numOfNotifs }) => {
  const classes = useStyles();
  
  return(
    <div className={classes.root}>
      <AppBar position="static" elevation={0} color='inherit'>
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
            { NavBtns(home, numOfNotifs) }
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default Navbar;