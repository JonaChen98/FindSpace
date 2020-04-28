import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Professional from '../assets/professional.png';
import Student from '../assets/student.png';
import Navbar from '../components/navbar';

const useStyles = makeStyles({
  // root: {
  //   maxWidth: 345,
  // },
  media: {
    height: 140,
  },
});


export default function ContainedButtons() {
  const classes = useStyles();
 
  return (
  <div>
    <Navbar/>
    <div style={{marginTop: "40%",margin: "auto", width: "50%", padding: "10px", display: "flex"}}>
  {/* <div style ={{ display: "flex", margin: "0px auto", position:"absolute"}}> */}
      <div id = "studentCard" style={{ width: "40%", float: "left", padding: "20px"}}>
        <Card>
        {/* <Card className={classes.root}> */}
          <CardContent>
            <Typography 
              gutterBottom variant="h5" 
              component="h2"  
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}
              >
                STUDENT
            </Typography>
          </CardContent>
          
          <CardMedia className={classes.media} image={Student}/>
          
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Join as a student and browse through spaces offered by companies and individuals.
            </Typography>
          </CardContent>

          <CardActions style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
            {/* TODO: Change link  */}
            <Button variant="contained" color="primary" component={Link} to="/Profile">
            Join as a student
            </Button>
          </CardActions>

        </Card>

        </div>

        <div id = "professionalCard" style={{ width: "40%", float: "left", padding: "20px"}}>
        <Card>
        {/* <Card className={classes.root}> */}
          <CardContent>
            <Typography 
              gutterBottom variant="h5" 
              component="h2"  
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}
              >
                PROFESSIONAL
            </Typography>
          </CardContent>
          
            <CardMedia
              className={classes.media}
              image={Professional}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
              Join as a professional to offer students a space for studying and school work.
              </Typography>
            </CardContent>
            <CardActions style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
            {/* TODO: Change link  */}
            <Button variant="contained" color="primary" component={Link} to="/Profile">
            Join as a professional
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  </div>
    );
}