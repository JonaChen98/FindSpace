import React from 'react';
import '../styles/login.css';
import {useState} from 'react';
const router = require('express').Router();
import logo from '../assets/FindspaceLogo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Login () {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");


  const handleLogin = (event) => {
    event.preventDefault();
    router.post("/api/login-student", {school_email:username, password:password})
  }

  return( 
    <div className = "background">
      <div>
        <div className = "flex">
          <img className = "logo" src = {logo} ></img>
          <h1 className = "findspace">Findspace</h1>
        </div>
        <h1 className = "hellomessage">Hello!</h1>
        <form className = "loginform">
          {/* event.target.value for each input */}
          <TextField className = "logininput" label = "school_email" id = "Email" onChange = {event => setusername(event.target.value)}/><br/>
          <TextField className = "logininput" label = "password" id = "pass" onChange = {event => setpassword(event.target.value)}/> <br />
          <Button type="submit" id="submitbutton" onClick = {handleLogin}/>
        </form>  
      </div> 
    </div>
  );
}

export default Login;