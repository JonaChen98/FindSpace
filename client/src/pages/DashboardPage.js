import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Dashboard from '../components/dashboard';

import '../styles/dashboard.css';
import axios from 'axios';

const DashboardPage = () => {
  const [response, setRes] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [cardsPerPage] = useState(5);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/professionals');
      setRes(res.data);
    }
    fetchData();
  }, []);
  
  const paginate = (event, value) => {
    setCurrPage(value);
  }
  
  const indexOfLastCard = currPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currCards = response.slice(indexOfFirstCard, indexOfLastCard);
  
  return(
    <div className="dashboard-page-container">
      <Navbar />
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
