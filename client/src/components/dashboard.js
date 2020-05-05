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
    setRes,
    studentBool,
    profReview,
    profAccepted
  } = props;
  
  const getProfBtns = (student) => {
    if(profReview) {
      return(
        <CardActions>
          <Button onClick={() => sendProfRequest(student.id, 1, "accept")}>
            Accept
          </Button>
          <Button onClick={() => sendProfRequest(student.id, 1, "reject")}>
            Reject
          </Button>
        </CardActions>
      );
    }
    else {
      return(
        <CardActions>
          <Button onClick={() => sendProfRequest(student.id, 1, "cancel")}>
            Cancel
          </Button>
        </CardActions>
      );
    }
  }
  
  const sendProfRequest = async (studentPKID, professionalPKID, btnAction) => {
    switch(btnAction) {
      case "accept":
        let accept_student = await axios.post('/api/accept-student', {
          studentPKID: studentPKID,
          professionalPKID: professionalPKID
        });
        if(!accept_student.err) {
          let review_students = await axios.get('/api/review-students', {
            params: {
              profID: professionalPKID
            }
          });
          setRes(review_students.data);
        }
        break; 
      case "reject": 
        let reject_student = await axios.post('/api/reject-student', {
          studentPKID: studentPKID
        });
        if(!reject_student.err) {
          let review_students = await axios.get('/api/review-students', {
            params: {
              profID: professionalPKID
            }
          });
          setRes(review_students.data);
        }
        break;
      // case "cancel":
      //   let cancel_student = await axios.post('/api/cancel-accepted-student', {
      //     studentPKID: studentPKID
      //   });
      //   if(!cancel_student.err) {
      //     let review_students = await axios.get('/api/review-students', {
      //       params: {
      //         profID: professionalPKID
      //       }
      //     });
      //     setRes(review_students.data);
      //   }
    }
  }
  
  const getStudentBtns = (prof) => {
    if(browseBool) {
      return(
        <CardActions>
          <Button onClick={() => sendStudentRequest(1, prof.id)}>
            Send A Request
          </Button>
        </CardActions>
      );
    }
    else {
      return(
        <CardActions>
          <Button onClick={() => sendStudentRequest(1, prof.id)}>
            Cancel
          </Button>
        </CardActions>
      );
    }
  }
  
  const sendStudentRequest = async (studentPKID, professionalPKID) => {
    if(browseBool) {
      let select_prof = await axios.post('/api/select-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID
      });
      if(!select_prof.err) {
        let browse_prof = await axios.get('/api/browse-professionals', {
          params: {
            studentID: studentPKID
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
      if(!cancel_prof.err) {
        let pending_profs = await axios.get('/api/pending-professionals', {
          params: {
            studentPKID: studentPKID
          }
        });
        setRes(pending_profs.data);
      }
    }
  }
  
  
  return(
    <div className="dashboard-content">
      <div className="row">
        <div className="cards-container">
          {
            data.map((item) => {
              return(
                <Card key={item.id}>
                  <CardActionArea>
                    <CardContent>
                      <Typography>
                        name: {item.name},
                        <br />
                        id: {item.id},
                        <br />
                        email: {item.email},
                        <br/>
                        company: {item.company}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {
                    studentBool ? getStudentBtns(item) : getProfBtns(item)
                  }
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