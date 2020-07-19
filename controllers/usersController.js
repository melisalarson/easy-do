// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// //current path = '/profile'

router.get('/', (req, res) => {
  db.User.findById(
    req.session.currentUser._id,
    (err, foundUser) => {
      if (err) return console.log(err);
      console.log("foundUser:",foundUser)
      res.render('users/profile', {user: foundUser});
    });
});


// module.exports = router;