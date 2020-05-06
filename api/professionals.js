const router = require('express').Router();
const { 
  Professional, 
  Student,
  ReviewStudentsList, 
  AcceptedStudentsList, 
  PendingProfessionalsList,
  MatchedProfessionalsList
} = require("../models");
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

router.get("/api/accepted-students", async (req, res) => {
  let list_of_students; 
  let accepted_students = [];
  
  try {
    list_of_students = await AcceptedStudentsList.findAll({
      where: {
        professionalPKID: req.query.profPKID
      }
    });
  }
  catch(err) {
    res.send(err);
  }
  
  if(list_of_students != null) {
    for(const student_obj of list_of_students) {
      let student = await Student.findByPk(student_obj.dataValues.id);
      accepted_students.push(student.dataValues);
    }
  }
  
  res.status(200).json(accepted_students);
})

router.get("/api/browse-professionals", async (req, res) => {
  // req = { studentID: 1 }
  let list_of_students;
  let browse_professionals = [];
  
  try {
    list_of_students = await Student.findAll({
      where: {
        "id": req.query.studentID
      }
    });
  }
  catch(err) {
    res.send(err);
  }
  
  if(list_of_students != null) {
    let list_of_prof_ids = list_of_students[0].dataValues.browseProfessionals;
    
    for(const id of list_of_prof_ids) {
      let professional = await Professional.findByPk(id);
      browse_professionals.push(professional.dataValues);
    } 
  }
  
  res.status(200).json(browse_professionals);
    
})

router.get("/api/pending-professionals", async (req, res, next) => {
  let pending_prof_list; 
  let pending_professionals = [];
  
  try {
    pending_prof_list = await PendingProfessionalsList.findAll({
      where: {
        studentPKID: req.query.studentPKID
      }
    });
  }
  catch(err) {
    res.send(err);
  }
  
  async function getPendingProfs() {
    for (const item of pending_prof_list) {
      let professional = await Professional.findByPk(item.dataValues.professionalPKID);
      pending_professionals.push(professional.dataValues);
    }
    res.status(200).json(pending_professionals);
  }
  
  getPendingProfs();
});


router.get("/api/matched-professionals", async (req, res, next) => {
  let matched_prof_list; 
  let matched_professionals = [];
  
  try {
    matched_prof_list = await MatchedProfessionalsList.findAll({
      where: {
        studentPKID: req.query.studentPKID
      }
    });
  }
  catch(err) {
    res.send(err);
  }
  
  async function getMatchedProfs() {
    for (const item of matched_prof_list) {
      let professional = await Professional.findByPk(item.dataValues.professionalPKID);
      matched_professionals.push(professional.dataValues);
    }
  }
  
  if(matched_prof_list != null) {
    getMatchedProfs();
  }
  
  res.status(200).json(matched_professionals);
  
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
      let profPKID; 
      Professional.create({ 
        "name": req.body.name,
        "password": hashedPassword,
        "email": req.body.email,
        "company": req.body.company,
        "job": req.body.job
       }).then(professional => {
        console.log("Created professional in DB");
        profPKID = professional.dataValues.id;
        
        var token = jwt.sign({ id: professional.dataValues.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        req.session.name = req.body.name;
        req.session.authtoken = token;
        
        // add pkid to student's prof list 
        Student.findAll()
          .then(list_of_students => {
            list_of_students.forEach(student => {
              student.dataValues.browseProfessionals.push(profPKID);
              Student.update({
                browseProfessionals: student.dataValues.browseProfessionals
              }, {
                where: {
                  id: student.dataValues.id
                }
              })
            })
          }).catch(err => {
            res.status(401).send("Can't find students");
          });
        
        let prof_res = {
          "id": professional.dataValues.id,
          "name": professional.dataValues.name,
          "email": professional.dataValues.email,
          "company": professional.dataValues.company,
          "job": professional.dataValues.job
        }
      
        res.status(200).send({
          professional: prof_res,
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
  }).then(professional => {
    if(professional.length > 0) {

      var resPW = professional[0].dataValues.password;
      var resID = professional[0].dataValues.id;
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, resPW);
      
      if(!passwordIsValid) return res.status(401).send("Password not valid");
      
      var token = jwt.sign({ id: resID }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      req.session.name = req.body.name;
      req.session.authtoken = token;
      
      let prof_res = {
        "id": professional[0].dataValues.id,
        "name": professional[0].dataValues.name,
        "email": professional[0].dataValues.email,
        "company": professional[0].dataValues.company,
        "job": professional[0].dataValues.job
      }
      
      res.status(200).send({
        auth: true,
        token: token,
        professional: prof_res
      });
    }
    else {
      res.status(401).send("User does not exist!");
    }
  });
});

router.post("/api/accept-student", async (req, res) => {
  // var token = req.headers['x-access-token'];
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  let accepted_student = await AcceptedStudentsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  let matched_prof = await MatchedProfessionalsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  let remove_student = await ReviewStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  if(!create_student.err && !matched_prof.err && !remove_student.err) {
    res.status(200).send("Added student in accepted, added prof to matched list, removed student from review");
  }
  else {
    res.status(401).send("Failed to accept student");
  }

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