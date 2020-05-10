import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';
import { TableBody, Container } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Profile = () => {
  //const [response, setRes] = useState("");
  
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  // etc... more data points 
  
  // componentdidMount

  //test ProfileInfo display
  //const myobj = {"name":"John", "school":"no", "school_email":"a@a.com", "major":"comp sci"};

  const myobj2 = {"name":"bob", "company":"yeah no", "email":"a@a.com", "job":"coding"};

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
        setSchool(profInfo.company);
        setEmail(profInfo.email);
        setMajor(profInfo.job);
      }

    }, []);

    //Test ProfileInfo Display
    
    /*useEffect(() => {
      localStorage.setItem("studentInfo", JSON.stringify(myobj));
    });*/

     
    useEffect(() => {
      localStorage.setItem("profInfo", JSON.stringify(myobj2));
    });

 
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

      <div>
        <h1>{name}</h1>
      </div>
      
      <div className="userInfo-container">
        <Container />
        <div className="email">
          {email}
        </div>
        <div className="major">
          {major}
        </div>
        <div className="school">
          {school}
        </div>
        <div className="age">
          {age}
        </div>
        <Container />
      </div>
              
      <div>
        <Footer />
      </div>

    </div>
          );
}


export default Profile;