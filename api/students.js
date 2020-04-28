const router = require('express').Router();
const { Student, PendingProfessionalsList, MatchedProfessionalList, ReviewStudentsList } = require("../models");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// returns list of students
router.get("/api/students", async(req, res) => {
  let students; 
  
  try {
    students = await Student.findAll();
  }
  catch(err) {
    res.send(err);
  }

  res.status(200).json(students);
});

router.post("/api/register-student", (req, res) => {
  Student.findAll({
    limit: 1,
    where: {
      "name": req.body.name,
      "age": req.body.age,
      "school_email": req.body.school_email,
      "major": req.body.major
    }
  }).then(response => {
    if(response.length > 0) {
      res.status(401).send("User already exists!");
    }
    else {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      
      Student.create({ 
        "name": req.body.name,
        "age": req.body.age,
        "password": hashedPassword,
        "school_email": req.body.school_email,
        "major": req.body.major
       })
      .then(student => {
        console.log("Created student in DB");
        
        var token = jwt.sign({ id: student.dataValues.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        req.session.name = req.body.name;
        req.session.authtoken = token;

        res.status(200).send({
          student: student,
          authtoken: token
        });
      })
    }
  }).catch(err => {
    res.status(401).send(err);
  })
})


router.post("/api/login-student", (req,res) => {
  Student.findAll({
    limit: 1,
    where: {
      "school_email": req.body.school_email,
    }
  }).then(response => {
    if(response.length > 0) {
      var resPW = response[0].dataValues.password;
      var resID = response[0].dataValues.id;
      
      req.session.name = req.body.name;
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, resPW);
      if(!passwordIsValid) return res.status(401).send("Password not valid");
      
      var token = jwt.sign({ id: resID }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      req.session.authtoken = token;
      
      res.status(200).send({
        auth: true,
        token: token,
      });
    }
    else {
      res.status(401).send("User does not exist!")
    }
  });
})

// situation: student picks a professional from the browsing section
router.post("/api/select-professional", (req, res) => {
  // add professional to the pending table 
  PendingProfessionalsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  }).then(response => {
    res.status(200).send("Added professional to pending list");
  });
  
  ReviewStudentsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  }).then(response => {
    res.status(200).send("Added student to review students list");
  });
  
});


router.post("/api/cancel-selected-professional", (req,res) => {
  PendingProfessionalsList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  }).then(response => {
    res.status(200).send("Removed professional from pending list");
  })
});

router.post("/api/cancel-matched-professional", (req,res) => {
  MatchedProfessionalList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  }).then(response => {
    res.status(200).send("Removed professional from matched list");
  })
});


module.exports = router;