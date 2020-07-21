const express = require('express');
const router = express.Router();
const db = require('../models');

// //current path = '/profile'

router.get('/', (req, res) => {
  db.Collaborator.findById(
    req.session.currentUser._id,
    (err, foundUser) => {
      if (err) return console.log(err);
      console.log("foundUser:",foundUser)
      res.render('users/profile', {user: foundUser});
    });
});

router.put('/', (req, res) => {
  db.Collaborator.findByIdAndUpdate(
    req.session.currentUser._id,
    req.body,
    {new: true},
    (err, collabToUpdate) => {
      if (err) return console.log(err);
      
      res.redirect('/projects');
  });
});



module.exports = router;