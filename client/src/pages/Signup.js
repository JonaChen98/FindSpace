import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Professional from '../assets/professional.png';
import Student from '../assets/student.png';
import Navbar from '../components/navbar';
import '../styles/signup.css';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});


export default function ContainedButtons() {
  const classes = useStyles();
 
  return (
  <div>
    <Navbar/>
    
    <Typography variant="h4" style={{textAlign:"center", paddingTop:"50px"}}> Tell us who you are.</Typography>

    <div className="container-wrap">
        <div className="student-container">

          <img src={Student} alt="student" className="img"/>

            <Typography variant="h6" className="description">
                Join as a student to browse through spaces offered by companies and individuals.
            </Typography>

            <div className="button">
              <Button variant="outlined" size="large" color="primary" className="button" component={Link} to="/ProfileSetup_Student">
              <b> Join as a student </b>
              </Button>
            </div>
          </div>
            
        <div className="prof-container">
            
          <img src={Professional} alt="student" className="img"/>
          
          <Typography variant="h6" className="description">
            Join as a professional to offer students a space for quiet study and school work.
          </Typography>
          
          <div className="button">
            <Button variant="outlined" size="large" color="primary" component={Link} to="/ProfileSetup_Prof">
              <b>Join as a professional</b>
            </Button>
          </div>
     
        </div>
  
      
    </div>
  </div>
  
  );
}