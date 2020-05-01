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
              <h4> School Email: </h4>
              <TextField id="margin-none"/>
              <h4> Password: </h4>
              <TextField id="margin-none"/>
          </form>
        </div>
    
    <div>
        <h1 style={{textAlign:"center"}}> Step 2: Tell us about yourself. </h1>
        <div style={{margin: "auto", width: "50%", display: "flex", padding: "10px"}}>
            <div id="wrap1"  style={{float: "left"}}>
                <h4> School Name: </h4>
                    <TextField id="standard-basic" label="If you are an individual, please put individual" variant="outlined" />
            </div>
            <div id="wrap2"  style={{float: "left", paddingLeft: "10px"}}>
                <h4> Major: </h4>
                    <TextField required id="standard-basic" label="Required" variant="outlined" />
            </div>
        </div>
        <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
            <h4> Briefly describe yourself</h4>
                <TextField id="standard-basic" variant="outlined" />
            <h4> What do you intend to use the desk space if given?</h4>
                <TextField id="standard-basic" variant="outlined" />

            <Button variant="contained" color="primary" component={Link} to="/join" style={{justifyContent: "center", alignItems: "center"}}>
                Next
            </Button>
        </form>
       
        <hr>
        </hr>
    </div>
    <Footer/>
    </div>
  );
}