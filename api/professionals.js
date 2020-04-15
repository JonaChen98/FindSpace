const router = require('express').Router();
const { Professional, ReviewStudentsList, AcceptedStudentsList } = require("../models");

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
      "password": req.body.password,
      "email": req.body.email,
      "company": req.body.company,
      "job": req.body.job
    }
  }).then(response => {
    if(response.length > 0) {
      res.status(401).send("User already exists!");
    }
    else {
      Professional.create({ ...req.body })
        .then(professional => {
          console.log("Created professional in DB");
          req.session.name = req.body.name;
          res.status(200).json(professional);
        })
    }
  })
});

router.post("/api/login-professional", (req,res) => {
  Professional.findAll({
    limit: 1,
    where: {
      "name": req.body.name,
      "password": req.body.password
    }
  }).then(response => {
    if(response.length > 0) {
      req.session.name = req.body.name;
      res.send("Authorized Login!");
    }
    else {
      res.status(401).send("User does not exist!");
    }
  });
});

router.post("/api/accept-student", (req, res) => {
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