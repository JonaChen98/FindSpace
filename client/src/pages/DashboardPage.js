import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Dashboard from '../components/dashboard';
import { Button } from '@material-ui/core';

import '../styles/dashboard.css';
import axios from 'axios';

const StudentFilterBtns = (fetchBrowse, fetchPending, fetchAccepted) => {
  return(
    <div className="btn-row">
      <Button 
        variant="contained" 
        className="filter-btn" 
        onClick={fetchBrowse}
      >
        Browse
      </Button>
      <Button 
        variant="contained" 
        className="filter-btn" 
        onClick={fetchPending}
      >
        Pending
      </Button>
      <Button 
        variant="contained" 
        className="filter-btn" 
        onClick={fetchAccepted}
      >
        Accepted
      </Button>
    </div>
  );
}

const ProfessionalFilterBtns = () => {
  return(
    <div>
      <Button variant="contained" className="filter-btn">Review</Button>
      <Button variant="contained" className="filter-btn">Cancel</Button>
    </div>
  );
}



const DashboardPage = () => {
  const [response, setRes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
  // filter buttons - student
  const [browse, toggleBrowse] = useState(true);
  const [pending, togglePending] = useState(false);
  const [accepted, toggleAccepted] = useState(false);
  // filter btns - professional
  const [review, toggleAccept] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/professionals');
      setRes(res.data);
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("refresh");
  }, [response]);
  
  const fetchBrowse = () => {
    console.log("fetch browse");
    if(browse === false) {
      toggleBrowse(true);
      axios.get('/api/professionals')
      .then(res => {
        setRes(res.data);
      })
      .catch(err => {
        // console.log(err);
      })
    }
  }
  
  const fetchPending = () => {
    console.log("fetch pending");
    if(pending === false) {
      togglePending(true);
      axios.get('/api/pending-professionals')
      .then(res => {
        console.log(res.data);
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
  
  // // toggle browse   
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("toggle browse");
  //     const res = await axios.get('/api/professionals');
  //     setRes(res.data);
  //   }
  //   fetchData();
  // }, [browse]);
  
  // // toggle pending   
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("toggle pending");
  //     const res = await axios.get('/api/pending-professionals');
  //     setRes(res.data);
  //   }
  //   fetchData();
  // }, [pending]);
  
  // // toggle accepted   
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("toggle accepted");
  //     const res = await axios.get('/api/accepted-professionals');
  //     setRes(res.data);
  //   }
  //   fetchData();
  // }, [accepted]);
  
  const paginate = (event, value) => {
    setCurrPage(value);
  }
  
  const indexOfLastCard = currPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currCards = response.slice(indexOfFirstCard, indexOfLastCard);
  
  return(
    <div className="dashboard-page-container">
      <Navbar />
      {StudentFilterBtns(fetchBrowse, fetchPending, fetchAccepted)}
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

export default DashboardPage;
