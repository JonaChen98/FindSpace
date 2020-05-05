import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';

import UserData from '../pages/usertest.json'
import ProfData from '../pages/proftest.json'

const Profile = () => {
  const [response, setRes] = useState("");
  
  useEffect(() => {
    axios.get('/api')
      .then(res => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  var x = 1;
  if(x === 1){
  return (
    <div className="profile-page">
      <div>
      <Navbar />
        <div className="profile-container">
          <h1>Student Profile</h1>
          <div className="userInfo-container">
            <div>
              <img className="profile-image" src="https://www.petlandflorida.com/wp-content/uploads/2019/09/Petland_Florida_Cavalier_King_Charles_Spaniel_puppy.jpg" alt="did not load"></img>
            </div>
            <div className="name">
              {UserData.map((UserJson, index)=>{
                return <p><b>{UserJson.name}</b></p>
                })}
            </div>
            <div className="major">
              {UserData.map((UserJson, index)=>{
                return <p>{UserJson.major} Major</p>
                })}
            </div>
            <div className="school">
              {UserData.map((UserJson, index)=>{
                return <p>School: {UserJson.school}</p>
                })}
            </div>
            <div className="email">
              {UserData.map((UserJson, index)=>{
                return <p>Email: {UserJson.email} </p>
                })}
            </div>
            <div className="phone">
              {UserData.map((UserJson, index)=>{
                return <p>Phone: {UserJson.phone}</p>
                })}
            </div>
          </div>
          
          <div className="question1">
            {UserData.map((UserJson, index)=>{
              return <p><b>Name one strength about you:</b> 
                <br></br>
                {UserJson.question1}</p>
              })}
          </div>

            <form className="qform">
              <div className="question">
              <label>
              Input Question here/description of workspace 
              <textarea className="question-box" type="text" name="Question" />
              </label>
              <Button variant="contained" color="primary" 
              type="submit" value="submit" size="small" >
                Submit
              </Button>
              </div>
              <br></br>
              <div className="question">
              <label>
              Input Question here/description of workspace 
              <textarea className="question-box" type="text" name="Question" />
              </label>
              <Button variant="contained" color="primary" 
              type="submit" value="submit" size="small" >
                Submit
              </Button>
              </div>
            </form>
          </div>
       </div>
      <Footer />
    </div>
  );
  }
  else if(x === 0){
    return (
      <div className="profile-page">
        <div>
        <Navbar />
          <div className="profile-container">
            <h1> Profession Profile</h1>
            <div className="userInfo-container">
              <div>
                <img className="profile-image" src="https://www.petlandflorida.com/wp-content/uploads/2019/09/Petland_Florida_Cavalier_King_Charles_Spaniel_puppy.jpg" alt="did not load"></img>
              </div>
              <div className="name">
                {UserData.map((UserJson, index)=>{
                  return <p><b>{UserJson.name}</b></p>
                  })}
              </div>
              <div className="major">
                {UserData.map((UserJson, index)=>{
                  return <p>{UserJson.major} Major</p>
                  })}
              </div>
              <div className="school">
                {UserData.map((UserJson, index)=>{
                  return <p>School: {UserJson.school}</p>
                  })}
              </div>
              <div className="email">
                {UserData.map((UserJson, index)=>{
                  return <p>Email: {UserJson.email} </p>
                  })}
              </div>
              <div className="phone">
                {UserData.map((UserJson, index)=>{
                  return <p>Phone: {UserJson.phone}</p>
                  })}
              </div>
            </div>
            <div className="workspacedesc1">
              {
                ProfData.map((ProfJson, index)=>{
                return<p><b>workspace description:</b><br></br>
                {ProfJson.workspace1}</p>
                })
              }
              </div>
              <form className="qform">
                <br></br> 
                <div className="question">
                <label>
                Input Question here/description of workspace 
                <textarea className="question-box" type="text" name="Question" />
                </label>
                <Button variant="contained" color="primary" 
                type="submit" value="submit" size="small" >
                  Submit
                </Button>
                </div>
                <br></br>
                <div className="question">
                <label>
                Input Question here/description of workspace 
                <textarea className="question-box" type="text" name="Question" />
                </label>
                <Button variant="contained" color="primary" 
                type="submit" value="submit" size="small" >
                  Submit
                </Button>
                </div>
              </form>
            </div>
         </div>
        <Footer />
      </div>
    );
    }
}


export default Profile;