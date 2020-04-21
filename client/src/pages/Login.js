import React from 'react';
import '../styles/login.css';

import findspacelogo from '../assets/FindspaceLogo.png';



const Login = () => {

  return( 
    <div className = "background">
      <div className = "logoandheader">
      </div>
      <h1 id = "hellomessage">Hello!</h1>
      <div>
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