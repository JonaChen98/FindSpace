const router = require('express').Router();
const { 
  Student, 
  Professional,
  PendingProfessionalsList, 
  MatchedProfessionalList, 
  ReviewStudentsList,
  AcceptedStudentsList,
  ProfessionalNotifications,
  StudentNotifications
} = require("../models");
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

router.get("/api/review-students", async (req, res, next) => {
  let review_students_list; 
  let review_students = [];

  try {
    review_students_list = await ReviewStudentsList.findAll({
      where: {
        professionalPKID: req.query.profID
      }
    });
  }
  catch(err) {
    res.send(err);
  }
  
  async function getReviewStudents() {
    for (const item of review_students_list) {
      let student = await Student.findByPk(item.dataValues.studentPKID);
      review_students.push(student.dataValues);
    }
    res.status(200).json(review_students);
  }
    
  getReviewStudents();
});


router.get("/api/accepted-students", async (req, res, next) => {
  let accepted_students_list; 
  let accepted_students = [];
  
  try {
    accepted_students_list = await AcceptedStudentsList.findAll();
  }
  catch(err) {
    res.send(err);
  }
  
  async function getAcceptedStudents() {
    for (const item of accepted_students_list) {
      let student = await Student.findByPk(item.dataValues.studentPKID);
      accepted_students.push(student.dataValues);
    }
    
    res.status(200).json(accepted_students);
  }
  
  getAcceptedStudents();
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
      
      Professional.findAll()
        .then(list_of_profs => {
          let num_of_profs = [...Array(list_of_profs.length+1).keys()]; 
          num_of_profs.shift();
          
          Student.create({ 
            "name": req.body.name,
            "age": req.body.age,
            "password": hashedPassword,
            "school_email": req.body.school_email,
            "major": req.body.major,
            "browseProfessionals": num_of_profs
           })
          .then(student => {
            console.log("Created student in DB");
            
            var token = jwt.sign({ id: student.dataValues.id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            
            req.session.name = req.body.name;
            req.session.authtoken = token;
            
            let student_res = {
              id: student.dataValues.id,
              name: student.dataValues.name,
              school_email: student.dataValues.school_email,
              major: student.dataValues.major,
              age: student.dataValues.age,
            }
    
            res.status(200).send({
              student: student_res,
              authtoken: token
            });
          })
        })
        .catch(err => {
          res.status(401).send("Couldn't find professionals");
        })
    }
  }).catch(err => {
    res.status(401).send(err);
  })
})

// for login
// find a student by their school email
router.post("/api/login-student", (req,res) => {
  Student.findAll({
    limit: 1,
    where: {
      "school_email": req.body.school_email,
    }
    //if found create var to hold the password and ID of that studen
    // sessions to hold student name why?
  }).then(student => {
    if(student.length > 0) {
      var resPW = student[0].dataValues.password;
      var resID = student[0].dataValues.id;
      
      req.session.name = req.body.name;
      // bcrypt compares whether the given password matches with the password or coressponding student
      var passwordIsValid = bcrypt.compareSync(req.body.password, resPW);
      if(!passwordIsValid) return res.status(401).send("Password not valid");
      // token to keep logged in for 24 hours?
      var token = jwt.sign({ id: resID }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      req.session.authtoken = token;
      
      let student_res = {
        id: student[0].dataValues.id,
        name: student[0].dataValues.name,
        school_email: student[0].dataValues.school_email,
        major: student[0].dataValues.major,
        age: student[0].dataValues.age,
      }
      
      res.status(200).send({
        auth: true,
        token: token,
        student: student_res
      });
    }
    else {
      res.status(401).send("User does not exist!");
    }
  });
})


router.post("/api/select-professional", async (req, res) => {
  // add professional to the pending table 
  let pending_profs = await PendingProfessionalsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  // add student in review list 
  let review_students = await ReviewStudentsList.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
  });
  
  let student = await Student.findAll({
    where: {
      "id": req.body.studentPKID,
    }
  });
  // remove prof from browse list 
  let list_of_prof_ids = student[0].dataValues.browseProfessionals;
  let index_of_id = list_of_prof_ids.indexOf(req.body.professionalPKID);
  
  list_of_prof_ids.splice(index_of_id, 1);
  // update student browse list 
  let student_update = await Student.update({
    browseProfessionals: list_of_prof_ids
  }, {
    where: {
      id: req.body.studentPKID
    }
  })
  
  let send_notif_prof = await ProfessionalNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.studentName} sent a request`
  });
  
  if(pending_profs.err && review_students.err && student.err && student_update.err && !send_notif_prof.err) {
    res.status(401).send("Select professional api error");
  }
  else {
    res.status(200).send("Successfully selected Professional");
  }
  
});


router.post("/api/cancel-pending-professional", async (req,res) => {
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
  
  let remove_prof = await PendingProfessionalsList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  });
  
  let remove_student = await ReviewStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  let send_notif_prof = await ProfessionalNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.studentName} has cancelled the request`
  });
  
  if(!prof_to_browse.err && !remove_prof.err && !remove_student.err &&!send_notif_prof.err) {
    res.status(200).send("Removed professional from pending list and put back to browsing");
  }
  else {
    res.status(401).send("Failed to remove professional");
  }
});

router.post("/api/cancel-matched-professional", async (req,res) => {
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
  
  let remove_prof = await MatchedProfessionalList.destroy({
    where: {
      professionalPKID: req.body.professionalPKID
    }
  });
  
  let remove_student = await AcceptedStudentsList.destroy({
    where: {
      studentPKID: req.body.studentPKID
    }
  });
  
  let send_notif_prof = await ProfessionalNotifications.create({
    studentPKID: req.body.studentPKID,
    professionalPKID: req.body.professionalPKID,
    message: `${req.body.studentName} has cancelled the match`
  });
  
  if(!prof_to_browse.err && !remove_prof.err && !remove_student.err && !send_notif_prof.err) {
    res.status(200).send("Removed professional from matched list, removed student from accepted students list.");
  }
  else {
    res.status(401).send("Failed to remove professional");
  }
});

router.get("/api/get-student-notifications", async (req, res) => {
  let notif_objs = await StudentNotifications.findAll({
    where: {
      studentPKID: req.query.id
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