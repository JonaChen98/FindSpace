import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import { Typography, Container} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Profile = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    
      let studentInfo = localStorage.getItem("studentInfo");
      let profInfo = localStorage.getItem("profInfo");
      studentInfo = JSON.parse(studentInfo);
      profInfo = JSON.parse(profInfo);
      
      if(studentInfo){
        setName(studentInfo.name);
        setEmail(studentInfo.school_email);
        setMajor(studentInfo.major);
        setAge(studentInfo.age);
      }
      else if(profInfo){
        setName(profInfo.name);
        setCompany(profInfo.company);
        setEmail(profInfo.email);
        setJob(profInfo.job);
      }

    }, []);
  
  return(
      <div>
        <Navbar />
        <div className="wrapper">
          <Link style={{display: "flex",textDecoration: "none", color: "black", marginLeft: 55, marginTop: 60}}>
                <ArrowBackIcon fontSize="medium"/>
                <span style={{ marginTop: 3, marginLeft: 8, fontSize:20 }}>Back</span>
          </Link>
            <Container maxWidth='sm'>
            <Typography component="div" style={{ backgroundColor: 'white', height: '80vh' }}>
              
              <h1 style={{textAlign: "center", paddingTop:30}}>Hi, {name}</h1>
                  
                  <h3> Account Information:</h3>
                    <div className="email">
                      <b><p>Email:{email}</p></b>  
                    </div>

                  <h3> Personal Information:</h3> 
                    <div>
                      <b>{company ? company : null}</b>
                    </div>
                    
                  <div>
                    <b>{major ? major : null}</b>
                    <b>{job ? job : null}</b>
                  </div>
                  
                  <div>
                    <b>{age ? age : null}</b>
                  </div>
                
              </Typography>
              </Container>
        </div>
    </div>
  );
}

export default Profile;