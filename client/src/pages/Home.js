import React from 'react';
import '../styles/home.css';
import headerImage from '../assets/interaction.svg';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';

const Home = () => {
  
  return (
    <div className="home-container">
      <Navbar />
      <div className="header-container">
        <div className="header-left">
          <div className="header-title">
            Helping students revolutionize their study space.
          </div>  
          <p className="header-description">
            Whether you’re an undergrad or grad student, 
            discover spaces that inspire your most impactful work.
          </p>
        </div>
        <img src={headerImage} alt="logo" className="header-img"/>
      </div>
      <div className="getting-started">
        <div className="getting-started-title">How it works</div>
        <div className="getting-started-content">
          <div className="start-card" id="student-card">
            <div className="start-card-title">As a student...</div>
            <ol style={{ paddingBottom: 50 }}>
              <li>Create an account</li>
              <li>Set up your profile</li>
              <li>Browse and filter work spaces</li>
              <li>Select interested work spaces</li>
              <li>Wait to be matched!</li>
            </ol>
            <Button 
              variant="contained" 
              className="card-signup-btn"
              component={Link} to="/profilesetup_student"
            >
              Sign Up
            </Button>
          </div>
          <div className="start-card" id="prof-card">
            <div className="start-card-title">As a professional...</div>
            <ol style={{ paddingBottom: 20 }}>
              <li>Create an account</li>
              <li>Set up your profile</li>
              <li>Review students who are interested in your work space</li>
              <li>Select students to invite</li>
              <li>Students will be notified!</li>
            </ol>
            <Button 
              variant="contained" 
              className="card-signup-btn"
              component={Link} to="/profilesetup_prof"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;