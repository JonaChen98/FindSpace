import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';


const NotificationsPage = () => {
  const [notifs, setNotifs] = useState([]);
  
  const [response, setRes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
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
  
  return(
    <div>
      <Navbar home={false}/>
      
      {
        notifs.map(notification => {
          return(
            <div>
              {notification}
            </div>
          );
        })
      }
      
    </div>
  );
}

export default NotificationsPage;