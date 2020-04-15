import React from 'react';
// import '../styles/Login.css';

const Login = () => {

  return( 
    <div>
      <h1 className = "App">FindSpace</h1>
      <h1 id = "slide"  >Welcome!</h1>
      <label for="Email"><strong>School Email</strong></label><br />
      <form className = "Loginform">
        <input type ="text" id="Email" name ="Email" /><br />
        <label for="pass" id="password-label"><strong>Password</strong></label><br />
        <input type="password" id="pass" name="pass"  /> <br />
        <input type="submit" value="Login" id="buttonsize"/>
      </form>     
    </div>
  )
}

export default Login;