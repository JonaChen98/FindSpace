import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DashboardPage from './pages/DashboardPage';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';

const App = () => {
  return(
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/profilesetup" component={ProfileSetup} />
    </Router>
  );
}

export default App;
