import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Dashboard from '../components/dashboard';
import { Button } from '@material-ui/core';

import '../styles/dashboard.css';
import axios from 'axios';


const StudentDashboard = () => {
  const [response, setRes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
  const [id, setID] = useState(0);
  
  // filter buttons - student
  const [browse, toggleBrowse] = useState(true);
  const [pending, togglePending] = useState(false);
  const [accepted, toggleAccepted] = useState(false);
  
  const [info, setInfo] = useState({})
  const [notifs, setNotifs] = useState([])
  
  const student = true; 
  
  useEffect(() => {
    let studentInfo = localStorage.getItem("studentInfo");
    studentInfo = JSON.parse(studentInfo);
    setInfo(studentInfo);
    const { id } = studentInfo;
    setID(id);

    const fetchData = async () => {
      const res = await axios.get('/api/browse-professionals', {
        params: {
          studentID: id
        }
      });
      setRes(res.data);
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("refresh");
    // fetch notifications 
    axios.get("/api/get-student-notifications", {
      params: {
        id: id
      }
    }).then(res => {
      setNotifs(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [response]);
  
  const fetchBrowse = () => {
    console.log("fetch browse");
    if(browse === false) {
      toggleBrowse(true);
      togglePending(false);
      toggleAccepted(false);
      axios.get('/api/browse-professionals', {
        params: {
          studentID: id
        }
      })
      .then(res => {
        if(res.data.constructor === Object && res.data.length === undefined) {
          setRes([]);
        }
        else {
          setRes(res.data);  
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  
  const fetchPending = () => {
    console.log("fetch pending");
    if(pending === false) {
      togglePending(true);
      toggleBrowse(false);
      toggleAccepted(false);
      axios.get('/api/pending-professionals', {
        params: {
          studentPKID: id
        }
      })
      .then(res => {
        if(res.data.constructor === Object && res.data.length === undefined) {
          setRes([]);
        }
        else {
          console.log(res.data);
          setRes(res.data);  
        }
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
      toggleBrowse(false);
      togglePending(false);
      axios.get('/api/matched-professionals', {
        params: {
          studentPKID: id,
        }
      })
      .then(res => {
        if(res.data.constructor === Object && res.data.length === undefined) {
          setRes([]);
        }
        else {
          setRes(res.data);  
        }
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
      <Dashboard 
        totalCards={response.length} 
        data={currCards} 
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        currentPage={currPage}
        browseBool={browse}
        pendingBool={pending}
        acceptedBool={accepted}
        setRes={setRes}
        studentBool={student}
        id={id}
        info={info}
      />
    </div>
  );
}

export default StudentDashboard;
