import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';
import { TableBody, Container } from '@material-ui/core';


const Profile = () => {
  //const [response, setRes] = useState("");
  
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  // etc... more data points 
  
  // componentdidMount

  //test ProfileInfo display
  //const myobj = {"name":"John", "school":"no", "school_email":"a@a.com", "major":"comp sci"};

  useEffect(() => {
    
      let studentInfo = localStorage.getItem("studentInfo");
      studentInfo = JSON.parse(studentInfo);
      
      //if(studentInfo){
      setName(studentInfo.name);
      setSchool(studentInfo.school);
      setEmail(studentInfo.school_email);
      setMajor(studentInfo.major);
  //}
    }, []);

    //Test ProfileInfo Display
    /* 
    useEffect(() => {
      localStorage.setItem("studentInfo", JSON.stringify(myobj));
    });*/

 
  return(
    <div className="profile-container">
      <div>
        <Navbar />
      </div>

      <div>
        <h1>Student Profile</h1>
      </div>
              
      <div className="userInfo-container">
        <Container />
        <div className="name">
            {name}
        </div>
        <div className="email">
          {email}
        </div>
        <div className="major">
          {major}
        </div>
        <div className="school">
          {school}
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