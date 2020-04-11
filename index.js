const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./models/db");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const studentsAPI = require("./api/students");
const Logout = require("./api/logout");

app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var sess = {
  secret: 'nanikore',
  cookie: {}
}

const port = process.env.PORT || 4000;

app.use(session(sess));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(studentsAPI);
app.use(Logout);

db.sync().then(() => {
  app.listen(port, function() {
    console.log('App listening on port: ' + port);
  });
  console.log("Tables created!");
});

app.get("/api", function(req, res) {
  res.send("React Redux");
});

// The "catch-all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});