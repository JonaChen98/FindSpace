import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  return(
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
