import React, { useState, useEffect } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Button, CardActionArea, CardActions, Typography, Card, CardContent } from '@material-ui/core';
import axios from 'axios';

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
    setRes
  } = props;
  
  const getButtonText = (browse) => {
    if(browse) {
      return "Send A Request";
    }
    else {
      return "Cancel";
    }
  }
  
  const sendRequest = async (studentPKID, professionalPKID) => {
    if(browseBool) {
      let select_prof = await axios.post('/api/select-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID
      });
      if(!select_prof.err) {
        let browse_prof = await axios.get('/api/browse-professionals', {
          params: {
            studentID: 2
          }
        });
        setRes(browse_prof.data);
      }
    }
    else if(pendingBool) {
      let cancel_prof = await axios.post('/api/cancel-pending-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID
      });
      // if(!cancel_prof.err) {
      //   let pending_profs = await axios.get('/api/pending-professionals');
        
      // }
    }
  }
  
  
  return(
    <div className="dashboard-content">
      <div className="row">
        <div className="cards-container">
          {
            data.map((prof) => {
              return(
                <Card key={prof.id}>
                  <CardActionArea>
                    <CardContent>
                      <Typography>
                        name: {prof.name},
                        <br />
                        id: {prof.id},
                        <br />
                        email: {prof.email},
                        <br/>
                        company: {prof.company}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => sendRequest(2, prof.id)}>
                      {getButtonText(browseBool)}
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          }
        </div>
        <Pagination count={Math.ceil(totalCards / cardsPerPage)} page={currentPage} onChange={paginate}/>
      </div>
    </div>
  ); 
}

export default Dashboard;