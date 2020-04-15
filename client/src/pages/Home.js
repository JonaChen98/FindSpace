import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../logo.svg';
import axios from 'axios';

import Navbar from '../components/navbar';

const Home = () => {
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
  
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>{response}</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Home;