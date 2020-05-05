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
    </Router>
  );
}

export default App;
