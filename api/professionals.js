const router = require('express').Router();
const { Professional, ReviewStudentsList, AcceptedStudentsList } = require("../models");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.get("/api/professionals", async(req, res, next) => {
  let professional; 
  
  try {
    professional = await Professional.findAll();
  }
  catch(err) {
    res.send(err);
  }
  
  res.status(200).json(professional);
});

router.post("/api/register-professional", (req, res) => {
  Professional.findAll({
    limit: 1,
    where: {
      "name": req.body.name,
      "email": req.body.email,
      "company": req.body.company,
      "job": req.body.job
    }
  }).then(response => {
    if(response.length > 0) {
      res.status(401).send("User already exists!");
    }
    else {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      Professional.create({ 
        "name": req.body.name,
        "password": hashedPassword,
        "email": req.body.email,
        "company": req.body.company,
        "job": req.body.job
       })
        .then(professional => {
          console.log("Created professional in DB");
          
          var token = jwt.sign({ id: professional.dataValues.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          
          req.session.name = req.body.name;
          req.session.authtoken = token;
          
          res.status(200).send({
            professional: professional,
            authtoken: token
          });
        })
    }
  })
});

router.post("/api/login-professional", (req,res) => {
  Professional.findAll({
    limit: 1,
    where: {
      "email": req.body.email,
    }
  }).then(response => {
    if(response.length > 0) {

      var resPW = response[0].dataValues.password;
      var resID = response[0].dataValues.id;
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, resPW);
      
      if(!passwordIsValid) return res.status(401).send("Password not valid");
      
      var token = jwt.sign({ id: resID }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      req.session.name = req.body.name;
      req.session.authtoken = token;
      
      res.status(200).send({
        auth: true,
        token: token,
      });
    }
    else {
      res.status(401).send("User does not exist!");
    }
  });
});

router.post("/api/accept-student", (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  AcceptedStudentsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  }).then(response => {
    res.status(200).send("Added student to accepted students list");
  });
});

router.post("/api/reject-student", (req, res) => {
  ReviewStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  }).then(response => {
    res.status(200).send("Removed student from review student list");
  });
});

router.post("/api/cancel-accepted-student", (req, res) => {
  AcceptedStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  }).then(response => {
    res.status(200).send("Removed student from accepted list");
  })
})


module.exports = router;