import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



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
        <div style={{margin: "auto", width: "50%", display: "flex", padding: "10px"}}>
            <div id="wrap1"  style={{float: "left"}}>
                <h4> Company Name:</h4>
                    <TextField id="standard-basic" label="If you are an individual, please put individual" variant="outlined" />
            </div>
            <div id="wrap2"  style={{float: "left", paddingLeft: "10px"}}>
                <h4> Job Title / Occupation:</h4>
                    <TextField required id="standard-basic" label="Required" variant="outlined" />
            </div>
        </div>

        <div id = "prof_quest">
            <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
                <h4> What kind of student are you looking to give space to?</h4>
                <TextField id="outlined-basic" variant="outlined" />
                <h4> What do you intend to use the desk space if given?</h4>
                <TextField id="outlined-basic" variant="outlined" />
            </form>
        </div>
         
        
    </div>
  );
}