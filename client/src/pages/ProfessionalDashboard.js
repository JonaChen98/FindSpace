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
  
  const [id, setID] = useState(0);
  
  // filter btns - professional
  const [review, toggleReview] = useState(true);
  const [accepted, toggleAccepted] = useState(false);
  
  const [info, setInfo] = useState({})
  const [notifs, setNotifs] = useState([])
  
  useEffect(() => {
    let profInfo = localStorage.getItem("profInfo");
    profInfo = JSON.parse(profInfo);
    setInfo(profInfo);
    const { id } = profInfo;
    setID(id);
    
    const fetchData = async () => {
      const res = await axios.get('/api/review-students', {
        params: {
          profID: id
        }
      });
      setRes(res.data);
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("refresh");
    // fetch notifications 
    axios.get("/api/get-prof-notifications", {
      params: {
        id: id
      }
    }).then(res => {
      setNotifs(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [response]);
  
  const fetchReview = () => {
    console.log("fetch review");
    if(review === false) {
      toggleReview(true);
      toggleAccepted(false);
      axios.get('/api/review-students', {
        params: {
          profID: id
        }
      })
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
      toggleReview(false);
      axios.get('/api/accepted-students')
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
      <Navbar numOfNotifs={notifs.length}/>
      <div className="btn-row">
        <Button 
          variant="contained" 
          className="filter-btn"
          onClick={fetchReview}
        >
          Review
        </Button>
        <Button 
          variant="contained" 
          className="filter-btn"
          onClick={fetchAccepted}
        >
          Accepted
        </Button>
      </div>
      <Dashboard 
        totalCards={response.length} 
        data={currCards} 
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currPage}
        profReview={review}
        profAccepted={accepted}
        setRes={setRes}
        id={id}
        info={info}
      />
    </div>
  );
}

export default ProfessionalDashboard;
