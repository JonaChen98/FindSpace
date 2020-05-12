import React from 'react';
import '../styles/login.css';
import {useState} from 'react';
import logo from '../assets/FindspaceLogo.png';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const history = useHistory();
  
  const handleLogin = (event) => {
    event.preventDefault();

    axios.post('/api/login-student', {"email":email, "password":password})
    
    .then(res =>{
      //  localStorage.setItem(school_email,school_email);
      //  localStorage.setItem(password,password);
      console.log(res);
    })
    .catch((err) => {

      console.log("this is the error message:" + err);
    })

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
      <div>
        <div className = "flex">
        <a className="findspace" href = "http://localhost:3000/">Findspace</a>
        </div>
        <h1 className ="welcome">Welcome to Findspace!</h1>
        <form className = "loginform">
          {/* event.target.value for each input */}
          <TextField className="logininput" label="Email" onChange = {event => setEmail(event.target.value)} /><br/>
          <TextField className="logininput" label="Password" onChange = {event => setPassword(event.target.value)} /> <br />
          
          <input type = "submit" id = "submitbutton"  value="Login" onClick = {(e) => handleLogin(e)}/>
        </form>  
      </div> 
    </div>
  );
}

export default Login;