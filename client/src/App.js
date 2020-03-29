import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  return(
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/test" component={Test}/>
    </Router>
  );
}

export default App;
