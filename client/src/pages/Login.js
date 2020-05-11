import React from 'react';
import '../styles/login.css';
import {useState} from 'react';
import logo from '../assets/FindspaceLogo.png';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


function Login(event) {
  const [school_email, setschool_email] = useState("");
  const [password, setpassword] = useState("");
    const handleLogin = (event) => {
    event.preventDefault();
    axios.post('/api/login-student', {school_email":school_email, "password":password})
    
    .then(res =>{
      //  localStorage.setItem(school_email,school_email);
      //  localStorage.setItem(password,password);
      console.log(res);
    })
    .catch((err) => {

      console.log("this is the error message:" + err);
    })
  }

  return( 
    <div>
      <div>
        <div className = "flex">
          <img className = "logo" src = {logo} ></img>
          <h1 className = "findspace">Findspace</h1>
        </div>
        <h1 className ="welcome">Welcome to Findspace!</h1>
        <form className = "loginform">
          {/* event.target.value for each input */}
          <TextField className = "logininput" label = "school_email" id = "school_email" onChange = {event => setschool_email(event.target.value)} /><br/>
          <TextField className = "logininput" label = "password" id = "password" onChange = {event => setpassword(event.target.value)} /> <br />
          <input type = "submit" id = "submitbutton" onClick = {handleLogin}/>
        </form>  
      </div> 
    </div>
  );
}

export default Login;