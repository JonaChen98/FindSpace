import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import headerImage from '../assets/interaction.svg';
import axios from 'axios';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';

import UserData from '../pages/jsontest/usertest.json';
import ProfData from '../pages/jsontest/proftest.json';

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


  useEffect(() => {

    const fetchData = async () => {

      const res = await axios.get('/api/students');
      setRes(res.data);
      const data = await response.json();
      this.setState({ person: data.results[0] });
    }
    fetchData();
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
              {this.state.person.name}
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
          
          <div className="question">
            {UserData.map((UserJson, index)=>{
              return <p><b>Name one strength about you:</b> 
                <br></br>
                {UserJson.question1}</p>
              })}
          </div>
          <br></br>
          <div className="question">
            {UserData.map((UserJson, index)=>{
              return <p><b>Name one strength about you:</b> 
                <br></br>
                {UserJson.question1}</p>
              })}
          </div>
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
            </div>
         </div>
        <Footer />
      </div>
    );
    }
}


export default Profile;