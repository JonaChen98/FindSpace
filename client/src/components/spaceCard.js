import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button, Typography, Card, CardContent, CardActions, CardMedia } from '@material-ui/core';

import officeImg from '../assets/office.png';

const SpaceCard = ({ props, setRes, id, info, browseBool, pendingBool, acceptedBool }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const { spaceName, location, time, days, imageURL, professionalName, professionalPKID } = props;
  
  // console.log(props);
  // console.log("image url: ", imageURL);
  
  const getStudentBtns = () => {
    if(browseBool) {
      return(
        <CardActions style={{ marginLeft: 40 }}>
          <Button onClick={() => StudentSendRequest(id, professionalPKID)}>
            Send A Request
          </Button>
        </CardActions>
      );
    }
    else {
      return(
        <CardActions style={{ marginLeft: 40 }}>
          <Button onClick={() => StudentSendRequest(id, professionalPKID)}>
            Cancel
          </Button>
        </CardActions>
      );
    }
  }
  
  const StudentSendRequest = async (studentPKID, professionalPKID) => {
    if(browseBool) {
      let select_prof = await axios.post('/api/select-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID,
        studentName: info.name
      });
      if(!select_prof.err) {
        let browse_prof = await axios.get('/api/browse-professionals', {
          params: {
            studentID: studentPKID
          }
        });
        enqueueSnackbar("Request Sent!");
        setRes(browse_prof.data);
      }
    }
    else if(pendingBool) {
      let cancel_prof = await axios.post('/api/cancel-pending-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID,
        studentName: info.name
      });
      if(!cancel_prof.err) {
        let pending_profs = await axios.get('/api/pending-professionals', {
          params: {
            studentPKID: studentPKID
          }
        });
        enqueueSnackbar("Pending Request Cancelled");
        setRes(pending_profs.data);
      }
    }
    else {
      let cancel_prof = await axios.post('/api/cancel-matched-professional', {
        studentPKID: studentPKID,
        professionalPKID: professionalPKID,
        studentName: info.name
      });
      if(!cancel_prof.err) {
        await axios.post('/api/matched-professionals', {
          params: {
            studentPKID: studentPKID
          }
        }).then(res => {
          console.log(res);
          enqueueSnackbar("Accepted Request Cancelled");
          setRes(res.data);
        })
      }
    }
  }
  
  return(
    <div>
      <Card style={{ display: "flex", marginBottom: 30, paddingRight: 40 }}>
      <CardMedia
          image={officeImg}
          style={{ width: 300 }}
          title="Office Space"
        />
      <div style={{ display: "flex", flexDirection: "column"}}>
        <CardContent style={{ flex: "1 0 auto", marginLeft: 40 }}>
          <Typography component="h5" variant="h5">
            {spaceName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Location: {location}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Availability: {days}, {time}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Hosted by: {professionalName}
          </Typography>
        </CardContent>
        { getStudentBtns() }
      </div>
    </Card>
    </div>
  );
}

export default SpaceCard;