const router = require('express').Router();
const { 
  Professional, 
  Student,
  ReviewStudentsList, 
  AcceptedStudentsList, 
  PendingProfessionalsList,
  MatchedProfessionalList,
  StudentNotifications,
  ProfessionalNotifications,
  OfficeSpace
} = require("../models");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

const S3 = require('aws-sdk/clients/s3');
// const { accessKeyId, secretAccessKey, cfDomain } = require('../keys');

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
  let browse_professionals = [];
  
  let list_of_students = await Student.findAll({
    where: {
      "id": req.query.studentID
    }
  });
  
  if(!list_of_students.err) {
    let list_of_prof_ids = list_of_students[0].dataValues.browseProfessionals;
    
    for(const id of list_of_prof_ids) {
      let office_space = await OfficeSpace.findAll({
        where: {
          professionalPKID: id
        }
      });
      
      if(office_space.length > 0) {
        browse_professionals.push(office_space[0].dataValues);
      }
    } 

    res.status(200).json(browse_professionals);
  }
})

router.get("/api/pending-professionals", async (req, res, next) => {
  let pending_professionals = [];
  
  let pending_prof_list = await PendingProfessionalsList.findAll({
    where: {
      studentPKID: req.query.studentPKID
    }
  });
  
  if(!pending_prof_list.err) {
    for (const prof of pending_prof_list) {
      let office_space = await OfficeSpace.findAll({
        where: {
          professionalPKID: prof.dataValues.professionalPKID
        }
      });
      if(office_space.length != 0) {
        pending_professionals.push(office_space[0].dataValues);
      }
    }
    res.status(200).json(pending_professionals);
  }
  else {
    res.status(400).json({ err: 'Error getting pending office spaces' });
  }
});


router.get("/api/matched-professionals", async (req, res) => {
  let matched_professionals = [];
  
  let matched_prof_list = await MatchedProfessionalList.findAll({
    where: {
      studentPKID: req.query.studentPKID
    }
  });
  
  if(!matched_prof_list.err) {
    for (const prof of matched_prof_list) {
      let office_space = await OfficeSpace.findAll({
        where: {
          professionalPKID: prof.dataValues.professionalPKID
        }
      });
      if(office_space.length != 0) {
        matched_professionals.push(office_space[0].dataValues);
      }
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
      
      Professional.create({ 
        "name": req.body.name,
        "password": hashedPassword,
        "email": req.body.email,
        "company": req.body.company,
        "job": req.body.job
       }).then(professional => {
        console.log("Created professional in DB");
        
        var token = jwt.sign({ id: professional.dataValues.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        req.session.name = req.body.name;
        req.session.authtoken = token;
        
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
});

const cfDomain = process.env.AWS_CF_DOMAIN;
const s3 = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  // accessKeyId: accessKeyId,
  // secretAccessKey: secretAccessKey
});
const Bucket = 'findspace-webdev';

router.post("/api/:id/upload-space-img", async(req, res) => {
  const user = await Professional.findAll({
    where: {
      id: req.params.id
    }
  });
  if(user.length !== 1) {
    return res.status(401).json({err: `no user found with id "${req.params.id}"` });
  }
  
  let { spaceName, location, days, time } = req.body; 
  days = days.split(",");
  
  const fileExtensionMatch = req.files.image.name.match(/\.([a-zA-Z])+$/);
  const fileExtension = fileExtensionMatch ? fileExtensionMatch[0] : '';
  const spaceImgPath = `${req.params.id}/${new Date().getTime()}${fileExtension}`;
  
  if(!user.err) {
    s3.putObject({ Bucket, Body: req.files.image.data, Key: spaceImgPath }, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'unable to upload image to AWS S3' });
      }
      
      let create_space = await OfficeSpace.create({
        "spaceName": spaceName,
        "location": location,
        "time": time,
        "days": days,
        "imageUrl": `https://${cfDomain}/${spaceImgPath}`,
        "professionalName": user[0].dataValues.name,
        "professionalPKID": user[0].dataValues.id
      });
      
      Student.findAll()
        .then(list_of_students => {
          list_of_students.forEach(student => {
            student.dataValues.browseProfessionals.push(user[0].dataValues.id);
            Student.update({
              browseProfessionals: student.dataValues.browseProfessionals
            }, {
              where: {
                id: student.dataValues.id
              }
            });
          })
        }).catch(err => {
          res.status(401).send("Can't find students");
        });
      
      if(!create_space.err) {
        console.log("Create office space");
        res.status(200).send("Posted office space!");
      }
      else {
        res.status(401).json({ error: `error creating office space in db`});
      }
    });
  }
})

router.get("/api/:id/get-img", async (req, res) => {
  
})


module.exports = router;