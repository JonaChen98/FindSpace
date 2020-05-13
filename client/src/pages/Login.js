import React from 'react';
// import '../styles/login.css';
import {useState} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Navbar from '../components/navbar';
import {
  Typography,
  TextField,
  Button,
} from '@material-ui/core';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const history = useHistory();
  
  const handleLogin = (event) => {
    event.preventDefault();

    if(email.endsWith("edu")) {
      axios.post('/api/login-student', {
        school_email: email, 
        password: password
      })
      .then(res =>{
        console.log(res.data.student);
        localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
        let res_name = res.data.student.name.replace(/\s+/g, '-');
        localStorage.setItem("dashboardURL", `/${res_name}/student-dashboard`);
        history.push(`/${res_name}/student-dashboard`);
      })
      .catch((err) => {
        console.log("this is the error message:" + err);
      })
    }
    else {
      axios.post('/api/login-professional', {
        email: email, 
        password: password
      })
      .then(res =>{
        console.log(res.data.professional);
        localStorage.setItem("profInfo", JSON.stringify(res.data.professional));
        let res_name = res.data.professional.name.replace(/\s+/g, '-');
        localStorage.setItem("dashboardURL", `/${res_name}/professional-dashboard`);
        history.push(`/${res_name}/professional-dashboard`);
      })
      .catch((err) => {
        console.log("this is the error message:" + err);
      })
    }

  }

  return( 
    <div>
      <Navbar/>
      <div style={{padding:"150px 120px 120px 120px",display: 'flex', justifyContent: 'center',textAlign: 'center'}}>
      
        <div style={{padding: 25, margin: 'auto', maxWidth: 600, boxShadow: "1px 1px 30px -8px rgba(224,224,224,1)"}}>
        <Typography variant="h5" align="center" gutterBottom>
            Login to Findspace
          </Typography>
        <form>
          {/* event.target.value for each input */}
          <TextField
            label="Email"
            required
            fullWidth
            type="email"
            onChange = {event => setEmail(event.target.value)}>
          </TextField>
          <TextField
            label="Password"
            required
            fullWidth
            type="password"
            onChange = {event => setPassword(event.target.value)}>    
          </TextField>
          
          <div style={{textAlign:"center", padding: 25}}>
            <Button 
              type = "submit" 
              value="Login" 
              variant="contained"
              color="primary"
              onClick = {(e) => handleLogin(e)}>
              Login
            </Button>
          </div>

          <Button size="small" color='inherit' component={Link} to="/signup">
            <i>Don't have an account? Sign up here.</i>
          </Button>

        </form>  
        </div>
      </div> 
  </div>
  );
}

export default Login;