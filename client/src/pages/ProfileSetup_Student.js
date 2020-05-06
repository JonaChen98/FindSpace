import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
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

function ProfileSetupStudent() {
  const classes = useStyles();
  
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(0);

  const signUp = (e) => {
      e.preventDefault();
      console.log(name, password, age, email, major);
      axios.post('/api/register-student', {
          "name": name, 
          "password": password, 
          "age": age, 
          "school_email": email, 
          "major": major
        })
        .then(res => {
          console.log(res.data);
          history.push('/student-dashboard');
        })
        .catch((err) => {
          console.log("Error");
        })

  }
  return (
    <div>
      <Navbar/>
      <div>
        <h1 style={{textAlign:"center"}}> Tell us about yourself.</h1>
        <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
            <h4> Full Name: </h4>
            <TextField id="margin-none-standard-multiline-flexible" onChange={event => setName(event.target.value)}/>
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

        <Button variant="contained" type="submit" color="primary" onClick={(e) => signUp(e)} style={{justifyContent: "center", alignItems: "center"}}>
            Submit
        </Button>
      </form>
       
      <hr>
      </hr>
    </div>
    
    <Footer/>
    
    </div>
  );
}

export default ProfileSetupStudent;