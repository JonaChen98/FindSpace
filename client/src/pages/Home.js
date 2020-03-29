import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Redux</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/test" style={{ color: "#F0FFFF" }}>Test Page Link</Link>
        </header>
      </div>
    );
  } 
}

export default Home;