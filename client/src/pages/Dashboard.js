import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/dashboard.css';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const Dashboard = () => {
  
  const [page, setPage] = React.useState(1);
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  return(
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div className="row">
          <div className="btn-row">
            <Button variant="contained">Browse</Button>
            <Button variant="contained">Pending</Button>
            <Button variant="contained">Accepted</Button>
          </div>
          <div>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
