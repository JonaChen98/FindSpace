import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import StudentDashboard from './pages/StudentDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ProfileSetup_Student from './pages/ProfileSetup_Student';
import ProfileSetup_Prof from './pages/ProfileSetup_Prof';

const App = () => {
  return(
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/student-dashboard" component={StudentDashboard} />
      <Route exact path="/professional-dashboard" component={ProfessionalDashboard} />
      <Route exact path="/profilesetup" component={ProfileSetup} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profilesetup_student" component={ProfileSetup_Student} />
      <Route exact path="/profilesetup_prof" component={ProfileSetup_Prof} />
    </Router>
  );
}

export default App;
