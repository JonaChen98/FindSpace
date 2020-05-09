const router = require('express').Router();
const { 
  Professional, 
  Student,
  ReviewStudentsList, 
  AcceptedStudentsList, 
  PendingProfessionalsList,
  MatchedProfessionalList,
  StudentNotifications,
  ProfessionalNotifications
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
  let matched_professionals = [];
  
  let matched_prof_list = await MatchedProfessionalList.findAll({
    where: {
      studentPKID: req.query.studentPKID
    }
  });
  
  if(!matched_prof_list.err) {
    for (const item of matched_prof_list) {
      let professional = await Professional.findByPk(item.dataValues.professionalPKID);
      matched_professionals.push(professional.dataValues);
    }
    res.status(200).json(matched_professionals);
  }
  else {
    res.status(401).send("Failed to get matched professionals");
  }
  
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
  console.log(req.body.studentPKID, req.body.professionalPKID)
  
  let accepted_student = await AcceptedStudentsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  let matched_prof = await MatchedProfessionalList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  let remove_student = await ReviewStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  let remove_prof = await PendingProfessionalsList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  });
  
  let send_notif_student = await StudentNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.profName} accepted the request`
  });
  
  if(!accepted_student.err && !matched_prof.err && !remove_student.err && !accepted_student.err && !remove_prof.err && !send_notif_student.err) {
    res.status(200).send("Added student in accepted, added prof to matched list, removed student from review");
  }
  else {
    res.status(401).send("Failed to accept student");
  }

});

router.post("/api/reject-student", async (req, res) => {
  // remove student from professional's review students list 
  let remove_student = await ReviewStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  // remove professional from student's pending professionals list 
  let delete_pending_prof = await PendingProfessionalsList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  });
  
  // move prof to browsing 
  let student = await Student.findAll({
    where: {
      id: req.body.studentPKID
    }
  });
  
  let list_of_prof_ids = student[0].dataValues.browseProfessionals;
  list_of_prof_ids.push(req.body.professionalPKID);
  
  let prof_to_browse = await Student.update({
    browseProfessionals: list_of_prof_ids
  }, {
    where: {
      id: req.body.studentPKID
    }
  });
  
  let send_notif_student = await StudentNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.profName} rejected the request`
  });
  
  if(!remove_student.err && !delete_pending_prof.err && !prof_to_browse.err && !send_notif_student.err) {
    res.status(200).send("Removed student from review and removed professional from studne'ts pending list");
  }
});

router.post("/api/cancel-accepted-student", async (req, res) => {
  // remove student from accepted list 
  let remove_student = await AcceptedStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  // remove professional from student's matched list 
  let delete_matched_prof = await MatchedProfessionalList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  });
  
  // move prof to browsing 
  let student = await Student.findAll({
    where: {
      id: req.body.studentPKID
    }
  });
  
  let list_of_prof_ids = student[0].dataValues.browseProfessionals;
  list_of_prof_ids.push(req.body.professionalPKID);
  
  let prof_to_browse = await Student.update({
    browseProfessionals: list_of_prof_ids
  }, {
    where: {
      id: req.body.studentPKID
    }
  });
  
  let send_notif_student = await StudentNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.profName} cancelled the match`
  });
  
  if(!remove_student.err && !delete_matched_prof.err && !prof_to_browse.err && !send_notif_student.err) {
    res.status(200).send("Removed student from accepted list, removed professional from student's matched list, moved profssional back to browsing");
  }
});

router.get("/api/get-prof-notifications", async (req, res) => {
  let notif_objs = await ProfessionalNotifications.findAll({
    where: {
      professionalPKID: req.query.id
    }
  });
  
  if(!notif_objs.err) {
    let notifications = []
    notif_objs.forEach(notif => {
      notifications.unshift(notif.message)
    });

    res.status(200).json(notifications);
  }
  else {
    res.status(401).send("Couldn't get notifications");
  }
  
})


module.exports = router;