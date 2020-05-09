import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';
import { TableBody } from '@material-ui/core';


const Profile = () => {
  //const [response, setRes] = useState("");
  
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  // etc... more data points 

  /*const [rows, setRows] = useState([
    {names:"", school1:"", major1:"", school_email1: ""},
    {
      name1:"dan",
      school1: "School ",
      major1: "comp sci",
      school_email1: "tb@a.com"
    }
  ]);*/
  // componentdidMount
  useEffect(() => {
    
      let studentInfo = localStorage.getItem("studentInfo");
      studentInfo = JSON.parse(studentInfo);
      
      if(studentInfo){
      setName(studentInfo.name);
      setSchool(studentInfo.school);
      setEmail(studentInfo.school_email);
      setMajor(studentInfo.major);
  }
    }, []);

    /*useEffect(() => {
      localStorage.setItem("studentInfos", JSON.stringify(rows));
    });

    useEffect(() => {
    
      let studentInfo = localStorage.getItem("studentInfos");
      studentInfo = JSON.parse(studentInfos);
      
      if(studentInfo){
      setName(studentInfo.name1);
      setSchool(studentInfo.school1);
      setEmail(studentInfo.school_email1);
      setMajor(studentInfo.major1);
  }
    }, []);*/

 
  return(
    <div className="profile-container">
      <div>
        <Navbar />
      </div>

      <div>
        <h1>Student Profile</h1>
      </div>
              
      <div className="userInfo-container">
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
      </div>
              
      <div>
        <Footer />
      </div>

    </div>
          );
}


export default Profile;