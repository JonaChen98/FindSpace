import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Dashboard from '../components/dashboard';
import { Button } from '@material-ui/core';

import '../styles/dashboard.css';
import axios from 'axios';


const ProfessionalDashboard = () => {
  const [response, setRes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
  // filter btns - professional
  const [review, toggleReview] = useState(false);
  const [accepted, toggleAccepted] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/students');
      setRes(res.data);
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("refresh");
  }, [response]);
  
  const fetchReview = () => {
    console.log("fetch review");
    if(review === false) {
      toggleReview(true);
      axios.get('/api/professionals')
      .then(res => {
        setRes(res.data);
      })
      .catch(err => {
        // console.log(err);
      })
    }
  }
  
  const fetchAccepted = () => {
    console.log("fetch accepted");
    if(accepted === false) {
      toggleAccepted(true);
      axios.get('/api/accepted-professionals')
      .then(res => {
        setRes(res.data);
      })
      .catch(err => {
        // console.log(err);
      })
    }
  }

  
  const paginate = (event, value) => {
    setCurrPage(value);
  }
  
  const indexOfLastCard = currPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currCards = response.slice(indexOfFirstCard, indexOfLastCard);
  
  return(
    <div className="dashboard-page-container">
      <Navbar />
      <div className="btn-row">
        <Button variant="contained" className="filter-btn">Review</Button>
        <Button variant="contained" className="filter-btn">Cancel</Button>
      </div>
      <Dashboard 
        totalCards={response.length} 
        data={currCards} 
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currPage}
      />
    </div>
  );
}

export default ProfessionalDashboard;
