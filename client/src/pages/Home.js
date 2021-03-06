import React from 'react';
import '../styles/home.css';
import headerImage from '../assets/interaction.svg';
import step1 from '../assets/step1.svg';
import step2 from '../assets/step2.svg';
import step3 from '../assets/step3.svg';
import step4 from '../assets/step4.svg';
import step5 from '../assets/step5.svg';
import Footer from '../components/footer';

import { Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';


const Home = () => {
  localStorage.clear();
  
  return (
    <div className="home-container">
      <Navbar/> 
      
      <div className="header-container">
        <div className="header-left">
          
          <Typography variant="h3" className="header-title">
           Helping students revolutionize their study space.
           </Typography>
          
          <Typography variant="h5" className="header-description">
            Whether you’re an undergraduate or graduate student, 
            discover spaces that inspire your most impactful work
            offered by companies and individuals.
            </Typography>
        </div>
        <img src={headerImage} alt="logo" className="header-img"/>
      </div>

      <div className="getting-started">
        
        <Typography variant="h3" className="getting-started-title">
          Here's how it works: 
        </Typography> 
        
        <div className="getting-started-content">
        
        <div className="container">
          
          <div className="text">
            <Typography variant="h4" gutterBottom> 1. Create your account.</Typography>
              <Typography paragraph variant="h5" >
                Sign up as a student to browse spaces freely offered or
                sign up as a professional to join the list of providers.
              </Typography>
          </div>

          <div className="img-container">
            <img src={step1} alt="logo" className="step1-img"/>
          </div>
        </div>

        <div className="container">
          
          <div className="text">
            <Typography variant="h4" gutterBottom> 2. Set up your profile. </Typography>
            <Typography paragraph variant="h5" >
                As a student, you'll answer a few questions so a professional reviewing
                your profile can get to know who you are.

                As a professional, you'll answer a few questions so students can have 
                a better idea of the kind of person you're looking to invite.
            </Typography>
          </div>

          <div className="img-container">
              <img src={step2} alt="logo" className="step1-img"/>
          </div>
        </div>

        <div className="container">
          <div className="text">

            <Typography variant="h4" gutterBottom> 3. Browse and request. </Typography>
            <Typography paragraph variant="h5" >
                Students have the chance to browse spaces offered by professionals as well as 
                requesting a desired space.
              </Typography>
            
          </div>

          <div className="img-container">
              <img src={step3} alt="logo" className="step1-img"/>
          </div>
        </div>

        <div className="container">
          <div className="text">

            <Typography variant="h4" gutterBottom> 4. Review and accept. </Typography>  
              <Typography paragraph variant="h5" >
                Professionals will review requests made for their and accept if it's a match.
              </Typography>
            
            
          </div>

          <div className="img-container">
              <img src={step4} alt="logo" className="step1-img"/>
          </div>
        </div>
        
      

        <div className="container">
          <div className="text">
            <Typography variant="h4" gutterBottom> 5. Connect! </Typography>
            <Typography paragraph variant="h5" >
                Once a match has been made, connect with each other to confirm the time and date
                for arrangement and any additional logistics.
              </Typography>
            
            
        </div>
        
          <div className="img-container">
              <img src={step5} alt="logo" className="step1-img"/>
          </div>
        </div>

          <Typography variant="h4" align="center"> It's that simple! </Typography>

          <br/>
          
          <div className="button-style">
            <Button 
              color="primary"
              variant="contained" 
              component={Link} to="/signup"
              size="large"
              style={{borderRadius:"8px", fontStyle:"bold"}}
              >
              <Typography variant="h5"> Get started with Findspace </Typography>
            </Button>
          </div>

       </div>
        
        <hr />
      </div>

      <Footer />
      
    </div>
  );
}

export default Home;