import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button, Typography, Card, CardContent, CardActions, CardActionArea } from '@material-ui/core';

const StudentCard = ({ student, setRes, id, info, profReview }) => {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const getProfBtns = (student) => {
    if(profReview) {
      return(
        <CardActions>
          <Button onClick={() => ProfSendRequest(student.id, id, "accept")}>
            Accept
          </Button>
          <Button onClick={() => ProfSendRequest(student.id, id, "reject")}>
            Reject
          </Button>
        </CardActions>
      );
    }
    else {
      return(
        <CardActions>
          <Button onClick={() => ProfSendRequest(student.id, id, "cancel")}>
            Cancel
          </Button>
        </CardActions>
      );
    }
  }
  
  const ProfSendRequest = async (studentPKID, professionalPKID, btnAction) => {
    switch(btnAction) {
      case "accept":
        let accept_student = await axios.post('/api/accept-student', {
          studentPKID: studentPKID,
          professionalPKID: professionalPKID,
          profName: info.name
        });
        if(!accept_student.err) {
          let review_students = await axios.get('/api/review-students', {
            params: {
              profID: professionalPKID,
            }
          });
          enqueueSnackbar("Accepted Student!");
          setRes(review_students.data);
        }
        break; 
      case "reject": 
        let reject_student = await axios.post('/api/reject-student', {
          studentPKID: studentPKID,
          professionalPKID: professionalPKID,
          profName: info.name
        });
        if(!reject_student.err) {
          let review_students = await axios.get('/api/review-students', {
            params: {
              profID: professionalPKID
            }
          });
          enqueueSnackbar("Rejected Student");
          setRes(review_students.data);
        }
        break;
      case "cancel":
        let cancel_student = await axios.post('/api/cancel-accepted-student', {
          studentPKID: studentPKID,
          professionalPKID: professionalPKID,
          profName: info.name
        });
        if(!cancel_student.err) {
          let accepted_students = await axios.get('/api/accepted-students', {
            params: {
              profID: professionalPKID
            }
          });
          enqueueSnackbar("Cancelled Accepted Student");
          setRes(accepted_students.data);
        }
    }
  }
  
  return(
    <div>
      <Card className="user-card">
        <CardActionArea>
          <CardContent>
            <Typography>
              name: {student.name},
              <br />
              id: {student.id},
              <br />
              email: {student.email},
              <br/>
              company: {student.company}
            </Typography>
          </CardContent>
        </CardActionArea>
          { getProfBtns(student) }
      </Card>
    </div>
  );
}

export default StudentCard;