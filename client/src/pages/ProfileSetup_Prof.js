import React, {useState}from 'react';
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


export default function LayoutTextFields() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  

  const signUp = (e) => {
      e.preventDefault();
      axios.post('/api/register-professional'), {
          "name": name, 
          "password": password, 
          "email": email,
          "company": company
        }
        .then(res => {
          console.log(res);
          //console.log(res.data);
        })
        .catch((err) => {
          console.error(err.response);
          setError(!error);
        })
  }

  return (
    <div>
        <Navbar/>
        <div>
        
          <h1 style={{textAlign:"center"}}> Let's get you started.</h1>
          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> Full Name: </h4>
              <TextField id="margin-none" onChange={event => setName(event.target.value)}/>
              <h4> Email: </h4>
              <TextField id="margin-none" onChange={event => setEmail(event.target.value)}/>
              <h4> Password: </h4>
              <TextField id="margin-none" onChange={event => setPassword(event.target.value)}/>
              <h4> Company Name: </h4>
              <TextField id="margin-none" onChange={event => setCompany(event.target.value)}/>
              <h4> Job Title / Position: </h4>
              <TextField id="margin-none"/>
          </form>

          <form className={classes.root} noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
              <h4> What kind of student are you looking to give space to?</h4>
                <TextField id="outlined-basic" variant="outlined" />

            <Button variant="contained" type="submit" onClick={signUp} color="primary" component={Link} to="/join" style={{justifyContent: "center", alignItems: "center"}}>
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