const router = require('express').Router();
const Student = require("../models").Student;

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
      "password": req.body.password,
      "school_email": req.body.school_email,
      "major": req.body.major
    }
  }).then(response => {
    if(response.length > 0) {
      res.status(401).send("User already exists!");
    }
    else {
      Student.create({ ...req.body })
      .then(student => {
        console.log("Created student in DB");
        req.session.name = req.body.name;
        // req.session.auth_token = 
        res.status(200).json(student);
      })
    }
  }).catch(err => {
    console.log(err);
  })
})


router.post("/api/login-student", (req,res) => {
  Student.findAll({
    limit: 1,
    where: {
      "name": req.body.name,
      "password": req.body.password
    }
  }).then(response => {
    if(response.length > 0) {
      req.session.name = req.body.name;
      // req.session.auth_token = 
      res.status(200).send("Authorized Login!");
    }
    else {
      res.status(401).send("User does not exist!")
    }
  });
})

// router.post("/api/accept-student")


module.exports = router;