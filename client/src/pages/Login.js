import React from 'react';
import '../styles/login.css';
import personicon from '../assets/personicon.png';
import findspacelogo from '../assets/FindspaceLogo.png';



const Login = () => {

  return( 
    <div className = "background">
      <div className = "logoandheader">
        <img className="logo" src = {findspacelogo}></img>
        <h1 id = "name">Findspace</h1>
      </div>
      <h1 id = "loginmessage">Login</h1>
      <h1 id = "hellomessage">Hello!</h1>
      <div className = "personicon_and_form">
        <img className ="personicon" src = {personicon}></img>
        <form className = "loginform">
          <input className = "logininput" type ="text" id="Email" name ="Email"/><br/>
          <input className = "logininput" type="password" id="pass" name="pass"/> <br />
          <input type="submit" value="Login" id="submitbutton"/>
        </form>  
      </div> 
    </div>
  )
}

export default Login;