import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from '../components/footer';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}));

export default function ProfileSetupStudent() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");

  const signUp = (e) =>{
      e.preventDefault();
      axios.post('/api/register-student'), {
          "name": name, 
          "password": password, 
          "age": age, 
          "school_email": email, 
          "major": major
        }

  }
  return (
    <div>
        <Navbar/>
        <div>
        
        <h1 style={{textAlign:"center"}}> Tell us about yourself.</h1>
          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> Full Name: </h4>
              <TextField id="margin-none" onChange={event => setName(event.target.value)}/>
              <h4> Age: </h4>
              <TextField id="margin-none" onChange={event => setAge(event.target.value)}/>
              <h4> School Email: </h4>
              <TextField id="margin-none" onChange={event => setEmail(event.target.value)}/>
              <h4> Password: </h4>
              <TextField id="margin-none" onChange={event => setPassword(event.target.value)}/>
              <h4> School Name: </h4>
              <TextField id="margin-none"/>
              <h4> Major: </h4>
              <TextField id="margin-none" onChange={event => setMajor(event.target.value)}/>
          </form>
        </div>
    
    <div>
        <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
            <h4> Briefly describe yourself</h4>
                <TextField id="standard-basic" variant="outlined" />
            <h4> What do you intend to use the desk space if given?</h4>
                <TextField id="standard-basic" variant="outlined" />

            <Button variant="contained" type="submit" color="primary" onClick={signUp} component={Link} to="/dashboard" style={{justifyContent: "center", alignItems: "center"}}>
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