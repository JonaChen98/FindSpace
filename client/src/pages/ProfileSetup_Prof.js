import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from '../components/footer';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}));


export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div>
        <Navbar/>
        <div>
        
          <h1 style={{textAlign:"center"}}> Step 1: Create your account.</h1>
          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> Full Name: </h4>
              <TextField id="margin-none"/>
              <h4> Email: </h4>
              <TextField id="margin-none"/>
              <h4> Password: </h4>
              <TextField id="margin-none"/>
              <h4> Company Name: </h4>
              <TextField id="margin-none"/>
              <h4> Job Title / Position: </h4>
              <TextField id="margin-none"/>
          </form>

          <h1 style={{textAlign:"center"}}> Step 2: Tell us about yourself. </h1>
          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> What kind of student are you looking to give space to?</h4>
                <TextField id="outlined-basic" variant="outlined" />
              <h4> What do you intend to use the desk space if given?</h4>
                <TextField id="outlined-basic" variant="outlined" />
            </form>
        </div>
    <Footer/>
    </div>
  );
}