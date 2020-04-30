import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import JoinPage from './pages/JoinPage';
import CreateAccount from './pages/CreateAccount';
import ProfileSetup_Student from './pages/ProfileSetup_Student';
import ProfileSetup_Prof from './pages/ProfileSetup_Prof';

const App = () => {
  return(
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/createaccount" component={CreateAccount} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/join" component={JoinPage} />
      <Route exact path="/profilesetup_student" component={ProfileSetup_Student} />
      <Route exact path="/profilesetup_prof" component={ProfileSetup_Prof} />
    </Router>
  );
}

export default App;
