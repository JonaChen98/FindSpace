import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { Typography, Card, CardContent } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

import '../styles/notifs.css';

const NotificationsPage = () => {
  const [notifs, setNotifs] = useState([]);
  
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
  let dashboardURL = localStorage.getItem("dashboardURL");
  
  useEffect(() => {
    let profInfo = localStorage.getItem("profInfo");
    let studentInfo = localStorage.getItem("studentInfo");
    
    const fetchProfNotifs = async (id) => {
      let res = await axios.get("/api/get-prof-notifications", {
        params: {
          id: id
        }
      });
      setNotifs(res.data);
    }
    
    const fetchStudentNotifs = async (id) => {
      let res = await axios.get("/api/get-student-notifications", {
        params: {
          id: id
        }
      });
      setNotifs(res.data);
    }
    
    if(profInfo) {
      profInfo = JSON.parse(profInfo);
      let id = profInfo.id;
      fetchProfNotifs(id);
    }
    else {
      studentInfo = JSON.parse(studentInfo);
      let id = studentInfo.id;
      fetchStudentNotifs(id);
    }
  }, [])
  
  const paginate = (event, value) => {
    setCurrPage(value);
  }
  
  const indexOfLastCard = currPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currCards = notifs.slice(indexOfFirstCard, indexOfLastCard);
  
  return(
    <div className="notif-page-container">
      <Navbar home={false}/>
      <div>
        <Link 
          to={dashboardURL}
          style={{
            display: "flex",
            textDecoration: "none",
            color: "black",
            marginLeft: 55,
            marginTop: 50
          }}
        >
          <ArrowBackIcon />
          <span style={{ marginTop: 3, marginLeft: 8 }}>Back</span>
        </Link>
        <div className="notifs-container">
          {
            currCards.map((notification, key) => {
              return(
                <div key={key} className="notif-card">
                  <Card key="key">
                    <CardContent>
                      <Typography>
                        {notification}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          }
        </div>
      </div>
      
      <Pagination count={Math.ceil(notifs.length / cardsPerPage)} page={currPage} onChange={paginate} className="pagination"/>
    </div>
  );
}

export default NotificationsPage;