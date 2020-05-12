import React from 'react';

import Pagination from '@material-ui/lab/Pagination';

import StudentCard from './studentCard';
import SpaceCard from './spaceCard';

const Dashboard = (props) => {
  const { 
    data, 
    cardsPerPage, 
    totalCards, 
    paginate, 
    currentPage,
    browseBool,
    pendingBool,
    acceptedBool,
    setRes,
    studentBool,
    profReview,
    id,
    info
  } = props;
  
  return(
    <div className="dashboard-content">
      <div className="row">
        <div className="cards-container">
          {
            studentBool ? 
              data.map((item, key) => {
                return( 
                  <SpaceCard 
                    props={item} 
                    setRes={setRes} 
                    id={id} 
                    info={info}
                    browseBool={browseBool}
                    pendingBool={pendingBool}
                    acceptedBool={acceptedBool}
                    key={key}
                  />
                );
              })
              :
              data.map((item, key) => {
                return(
                  <StudentCard 
                    student={item} 
                    setRes={setRes} 
                    id={id} 
                    info={info} 
                    key={key}
                    profReview={profReview}
                  /> 
                );
              })
          }
        </div>
        <Pagination count={Math.ceil(totalCards / cardsPerPage)} page={currentPage} onChange={paginate} className="pagination"/>
      </div>
    </div>
  ); 
}

export default Dashboard;