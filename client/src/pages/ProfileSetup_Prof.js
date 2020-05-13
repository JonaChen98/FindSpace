import React, {useState}from 'react';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';

const ProfileSetupProfessional = () => {


  const history = useHistory();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    axios.post('/api/register-professional', {
        "name": name, 
        "password": password, 
        "email": email,
        "company": company,
        "job": job
      })
      .then(res => {
        localStorage.setItem("profInfo", JSON.stringify(res.data.professional));
        let res_name = res.data.professional.name.replace(/\s+/g, '-');
        localStorage.setItem("dashboardURL", `/${res_name}/professional-dashboard`);
        history.push(`/${res_name}/professional-dashboard`);
      })
      .catch((err) => {
        console.log("Error registering professional");
      })
  }

  return (

    <div>
      
      <Navbar/>
      
      <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
      
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Tell us about yourself.
        </Typography>

        <Typography paragraph align="center" gutterBottom>
          Create your account and post an unused space to share with students.
        </Typography>

          <form>
          {/* <form onSubmit={handleSubmit} > */}

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
                
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Company name"
                  helperText="If you are an individual providing space, please put individual"
                  required
                  margin="normal"
                  name="company name"
                  // value={state.major}
                  onChange={event => setCompany(event.target.value)}
                  />
                  {/* <div style={{ fontSize: 12, color: "red" }}>
                    {state.majorError}
                  </div> */}
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Job title / position"
                  required
                  margin="normal"
                  name="job title"
                  // value={state.age}
                  onChange={event => setJob(event.target.value)}
                />
                
                {/* <div style={{ fontSize: 12, color: "red" }}> */}
                  {/* {state.ageError} */}
                {/* </div> */}
              </Grid>
              

              <Grid item xs={9}>
                <TextField
                    label="Email"
                    helperText="We will not spam your email"
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
            
            <Grid item xs={12}>
              <TextField 
                label="What kind of student are you looking to give space to?"
                helperText="This helps students know if they are the right fit for you"
                multiline
                rowsMax={4}
                fullWidth/>
            </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={(e) => signUp(e)}
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

export default ProfileSetupProfessional;