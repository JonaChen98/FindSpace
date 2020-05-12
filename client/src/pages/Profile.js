import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';
import { TableBody, Container, Card } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardContent from '@material-ui/core/CardContent';


const Profile = () => {
  
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  // etc... more data points 
  
  // componentdidMount
  
  useEffect(() => {
    
      let studentInfo = localStorage.getItem("studentInfo");
      let profInfo = localStorage.getItem("profInfo");
      studentInfo = JSON.parse(studentInfo);
      profInfo = JSON.parse(profInfo);
      
      if(studentInfo){
        setName(studentInfo.name);
        setSchool(studentInfo.school);
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
    <div className="profile-container">
      <div>
        <Navbar />
      </div>

      <Link style={{
          display: "flex",
          textDecoration: "none",
          color: "black",
          marginLeft: 55,
          marginTop: 50
        }}
        >
        <ArrowBackIcon />
        <span style={{ marginTop: 3, marginLeft: 8 }}>Back</span>
      </Link>
      
      <div className="userInfo-container">
        <Container
        maxWidth='lg'
        />
        <div>
        {/*<img className="profile-image" src="https://www.thesprucepets.com/thmb/mERLXPcXz4U9G702HlsORXJqZrU=/4231x2380/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg" alt="Avatar"></img>*/}
        <h1>{name}</h1>
        <hr></hr>
        </div>

        <div className="email">
        <b><p>Email:</p></b>
          <b>{email}</b>
        </div>
        <hr></hr>
        <div className="school">
          <b>{school ? school : null}</b>
          <b>{company ? company : null}</b>
        </div>
        <hr></hr>
        <div className="major">
          <b>{major ? major : null}</b>
          <b>{job ? job : null}</b>
        </div>
        <hr></hr>
        <div className="age">
          <b>{age ? age : null}</b>
        </div>
        <Container />
      </div>

      <hr></hr>

    </div>
          );
  
}


export default Profile;