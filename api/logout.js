const router = require('express').Router();

router.get('/api/logout', (req,res) => {
  console.log("Ending Session...\n Logging Out")
  req.session.destroy();
  console.log("Session data after destroyed: ", req.session);
  res.send(true);
})

module.exports = router; 