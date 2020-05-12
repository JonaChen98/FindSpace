import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
import Footer from '../components/footer';
import axios from 'axios';
import {
  Typography,
  TextField,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';


const ProfileSetupStudent = () => {
  const history = useHistory();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(0);



  // let nameError = "";
  //   let emailError = "";
  //   let passwordError = "";
  //   let ageError = "";
  //   let majorError = "";
  // const validate = () => {

  //   if (name) {
  //     nameError = "Please enter your first and last name.";
  //   }

  //   if (email.includes(".edu")){
  //     emailError = "invalid email";
  //   }
  //   if (isNaN(age)){
  //     ageError = "Enter a number.";
  //   }
    
  //   if (password.length < 8){
  //     passwordError = "Password must be 8 characters";
  //   }

  //   if (emailError || nameError || passwordError|| ageError || majorError) {
      
      
  //     this.setState({ emailError, nameError, passwordError, 
  //       ageError, majorError });
        
  //     return false;
  //   }

  //   return true;
  // };

  
  const handleSubmit = event => {
    event.preventDefault();
    
    const registerStudent = async () => {
      const res = await axios.post("/api/register-student", {
        name: name, 
        password: password, 
        age: age, 
        school_email: email, 
        major: major
      });
      console.log(res.data.student);
      localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
      let res_name = res.data.student.name.replace(/\s+/g, '-');
      localStorage.setItem("dashboardURL", `/${res_name}/student-dashboard`);
      history.push(`/${res_name}/student-dashboard`);
    }
    
    registerStudent();
  };


  return (    

    <div>
      
      <Navbar/>
     
      <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
      
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Tell us about yourself.
        </Typography>

        <Typography paragraph align="center" gutterBottom>
          Create your account and let professionals get to know who you are.
        </Typography>

          <form onSubmit={handleSubmit} >

            <Paper style={{ padding: 16 }}>

              <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={9}>
                  <TextField
                    label="Full name"
                    required
                    helperText="Your first and last name"
                    name="name"
                    fullWidth
                    // value={name}
                    onChange={event => setName(event.target.value)}
                  />
                {/* <div style={{ fontSize: 12, color: "red" }}>
                  {nameError}
                </div> */}
              </Grid>

              <Grid item xs={9}>
                <TextField
                    label="School email"
                    helperText="You must register with a school email"
                    required
                    name="email"
                    fullWidth
                    // value={state.email}
                    onChange={event => setEmail(event.target.value)}
                  />
                  {/* <div style={{ fontSize: 12, color: "red" }}>
                    {state.emailError}
                  </div> */}
              </Grid>
              
              <Grid item xs={9}>
                <TextField
                  label="Password"
                  required
                  helperText="Must be at least 8 characters"
                  fullWidth
                  type="password"
                  name="password"
                    // value={state.password}
                  onChange={event => setPassword(event.target.value)}
                  />
                  {/* <div style={{ fontSize: 12, color: "red" }}>
                    {state.passwordError}
                  </div> */}
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Major"
                  required
                  margin="normal"
                  helperText="Use undeclared if you do not have a major"
                  name="major"
                  // value={state.major}
                  onChange={event => setMajor(event.target.value)}
                  />
                  {/* <div style={{ fontSize: 12, color: "red" }}>
                    {state.majorError}
                  </div> */}
              </Grid>
              
              <Grid item xs={3}>
                <TextField 
                  label="Age"
                  required
                  margin="normal"
                  name="age"
                  // value={state.age}
                  onChange={event => setAge(event.target.value)}
                />
                
                {/* <div style={{ fontSize: 12, color: "red" }}> */}
                  {/* {state.ageError} */}
                {/* </div> */}
              </Grid>

              

              <Typography paragraph variant="subtitle1" gutterBottom style={{padding:8}}>
                The below questions help professionals know if you're the right fit for each other:
              </Typography>
              
              <Grid item xs={12}>
                  <TextField 
                    label="Briefly describe yourself"
                    multiline
                    rowsMax={4}
                    fullWidth/>
              </Grid>
              
              <Grid item xs={12}>
                <TextField 
                  label="What do you intend to use the desk space if given?"
                  multiline
                  rowsMax={4}
                  fullWidth/>
              </Grid>

              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={e => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Grid>

          </Grid>
        </Paper>
      </form>

    </div>
    {/* <hr/>
    <Footer/> */}

  </div>
      
  );
}

export default ProfileSetupStudent;