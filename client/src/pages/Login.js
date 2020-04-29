import React from 'react';
import '../styles/login.css';
import logo from '../assets/FindspaceLogo.png'



const Login = () => {

  return( 
    <div className = "background">
      <div>
        <div className = "flex">
          <img className = "logo" src = {logo} ></img>
          <h1 className = "findspace">Findspace</h1>
        </div>
        <h1 className = "hellomessage">Hello!</h1>
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