import React from 'react';
import '../styles/login.css';
import {useState} from 'react';
import logo from '../assets/FindspaceLogo.png';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


function Login() {
  const [school_email, setschool_email] = useState("");
  const [password, setpassword] = useState("");
  
  const history = useHistory();
  
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('/api/login-student', {
      school_email: school_email, 
      password: password
    })
    .then(res =>{
      console.log(res.data.student);
      localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
      history.push('/student-dashboard');
    })
    .catch((err) => {
      console.log("this is the error message:" + err);
    })
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
          <TextField className="logininput" label="school_email" onChange = {event => setschool_email(event.target.value)} /><br/>
          <TextField className="logininput" label="password" onChange = {event => setpassword(event.target.value)} /> <br />
          <input type = "submit" id = "submitbutton" onClick = {(e) => handleLogin(e)}/>
        </form>  
      </div> 
    </div>
  );
}

export default Login;