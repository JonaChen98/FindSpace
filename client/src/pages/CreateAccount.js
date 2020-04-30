  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));


export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div>
        <Navbar/>
        <div style={{margin: "auto", width: "50%", padding: "10px"}}>
        
          <h1 style={{textAlign:"center"}}> Create your account.</h1>
          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> Full Name: </h4>
              <TextField id="margin-none"/>
              <h4> Email: </h4>
              <TextField id="margin-none"/>
              <h4> Password: </h4>
              <TextField id="margin-none"/>
              <h4> Confirm Password: </h4>
              <TextField id="margin-none"/>
        
            <Button variant="contained" color="primary" component={Link} to="/join" style={{justifyContent: "center", alignItems: "center"}}>
                Next
            </Button>

          </form>
        </div>
    </div>
  );
}