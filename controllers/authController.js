const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models')

//login form route
router.get('/login', (req, res) => {
  res.render("../views/auth/login");
});

//register form route
router.get('/register', (req, res) => {
  res.render('../views/auth/register');
});

// //user/register create route - MELISA
// router.post('/register', (req, res) => {
//   // console.log(req.body);
//   // real world, validate info before sending, ensure request is valid
//   db.User.create(req.body, (err, newUser) => {
//     if (err) return console.log(err);
//     console.log(newUser);
//     //auto login user
//     res.redirect('/login');
//   })
// })

//user/register create route - KENNY
router.post("/register", (req, res) => {
  console.log(req.body);

  // Verify req.body Is Not Empty
  // Query DB For Existing User By Email
  // If foundUser, Respond with 400
  // If No foundUser, Generate Salt and Hash User Password
  // Replae newUser Plain Text Password with Hased Password
  // Create newUser and Respond with 200
  // Check For Existing User Account
  db.Collaborator.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return console.log(err);
    if (foundUser) return console.log("user already exsists");

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);

        const { name, email, password } = req.body;
        const newUser = {
          name,
          email,
          password: hash, //***** IMP!!! never save plain text passwords
        };

        db.Collaborator.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);

          res.redirect("/login");
        });
      });
    });
  });
});

// //login create route - MELISA
// router.post('/login', (req, res) => {
//   console.log(req.body);

//   res.redirect('/users/profile');
// });

//login create route - KENNY
router.post("/login", (req, res) => {
  console.log(req.body);

  // Verify req.body Is Not Empty
  // Find One User By Email
  // If No User Found, Respond with 400
  // Compare Password Sent Password and foundUser Password
  // If Passwords Match, Create Session and Respond with 200
  // If Passwords Do Not Match, Respond with 400
  // Find User By Email Address
  db.Collaborator.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return console.log(err);
    console.log(foundUser, req.body.email)
    if (!foundUser) {
      return res.send("No User Found");
    }

    // Compare User Password with foundUser Password
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);

      // Create Session and Respond with 200 If Passwords Match
      if (isMatch) {
        // Create currentUser Object (Hide User Password)
        const currentUser = {  //we can add anything we want to this obj and pass it to the session and attach it to request
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          isLoggedIn: true,
        };

        // Create A New Session and Respond 200
        req.session.currentUser = currentUser; //create a session no need to require because its a property on an object... but need to configure in serverjs
        console.log("TEST", req.session.currentUser, currentUser)
        res.redirect("/projects");
      } else {
        
        // Respond with 400 If Passwords Do Not Match
        return res.send("Passwords do not match");
      }
    });
  });
});

//logout from route
router.get('/logout', (req, res) => {
  if (!req.session.currentUser) return res.send('you must be logged in to logout')
  
  req.session.destroy((err)=> { //session only available on the req side only
    if (err) return console.log(err);
  
    res.redirect('/login');
  });
});


module.exports = router;