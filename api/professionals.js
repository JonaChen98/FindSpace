const router = require('express').Router();
const { Professional } = require("../models");

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
          req.session.name = req.body.name;
          res.status(200).json(professional);
        })
    }
  })
})

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
})

// router.post("/api/select-professional")
// router.post("/api/")

module.exports = router;