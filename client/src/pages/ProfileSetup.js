import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';


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
        {/* <Box mx="auto"> */}
        <h2 style={{textAlign:"center"}}> Tell us about yourself.</h2>
        <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
            <h4> Question 1</h4>
            <TextField id="outlined-basic" variant="outlined" />
            <h4> Question 2</h4>
            <TextField id="outlined-basic" variant="outlined" />
            <h4> Question 3</h4>
            <TextField id="outlined-basic" variant="outlined" />
            <h4> What do you intend to use the desk space if given?</h4>
            <TextField id="outlined-basic" variant="outlined" />
        </form>
        {/* </Box> */}
        </div>
    </div>
  );
}