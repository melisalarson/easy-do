const express = require('express');
const router = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const notAssignedCollabId = '5f0cd8b9fed32e492a3170c1';

let promptString = null;

// 1)collab index route
router.get('/', (req, res) => {
  db.Collaborator.find({}, (err, allCollabs) => {
    if (err) return console.log(err);
    console.log(allCollabs);
    // console.log(allCollabs[0]);  //console logs jimmy
    
    res.render('collaborators', { collabs: allCollabs, promptString });
    promptString = null;
  });
});

// // 2)collab new route
// router.get('/new', (req, res) => {
//   res.render('collaborators/new');
// });
// 2)collab new route WITH SESSION
router.get("/new", (req, res) => {
  console.log(req.session);

  if (!req.session.currentUser) return res.redirect("/login");
  // if (!req.session.currentUser) {
  //   res.redirect('/login');
  // } else {
  //   res.render('/authors/new');
  // }

  res.render("/author/new");
});



// 4)collab show route
router.get('/:id', (req, res) => {
  db.Collaborator.findById(
    req.params.id)
      // (err, foundCollab) => {
      // if (err) return console.log(err);
      // console.log(foundCollab);

        // res.send(foundCollab);
        // res.render('collaborators/show', { collab: foundCollab });
    // });
    .populate({ path: 'tasks' })
    .exec((err, foundCollab) => {
      // console.log(req.params.id);
      if (err) return console.log(err);
      console.log(foundCollab);

      res.render('collaborators/show', { collab: foundCollab });
    });
});

// 3)collab create route
router.post('/', (req, res) => {
  db.Collaborator.create(
    // {name:'melisa'},
    req.body,
    (err, newCollab) => {
      if (err) return console.log(err);
      console.log(newCollab);
      
      // res.send(newCollab);
      res.redirect('/collaborators');
    }
  )
});

// 5)collab edit route
router.get("/:id/edit", (req, res) => {
  db.Collaborator.find({}, (err, allCollabs) => {
    if (err) return console.log(err);
    console.log(allCollabs);

    // if (req.params.id !== notAssignedCollabId) {
    db.Collaborator.findById(req.params.id, (err, collabToEdit) => {
      if (err) return console.log(err);
      console.log(collabToEdit);
      // });
      // } else {
      // promptString = `${req.params.id} cannot be edited`;
      // };
      // res.send(collabToEdit);
      res.render("collaborators/edit", {
        collabs: allCollabs,
        selectedCollab: collabToEdit,
        promptString,
      });
      promptString = null;
    });
  });
});


// 6)collab update route
router.put('/:id', (req, res) => {
  db.Collaborator.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, collabToUpdate) => {
      if (err) return console.log(err);
      console.log(collabToUpdate, req.body);
      
      // res.send(collabToUpdate);
      res.redirect('/collaborators');
  });
});

// 7)collab destroy route
router.delete('/:id', (req, res) => {
  if (req.params.id !== notAssignedCollabId) { // hard coded id for collab 'Not Assigned'
  db.Task.updateMany(
    {collaborators: [mongoose.Types.ObjectId(req.params.id)]},
    {collaborators : [mongoose.Types.ObjectId(notAssignedCollabId)]},
    (err, updatedCollab) => {
      if (err) return console.log(err);
      console.log(updatedCollab);

    db.Collaborator.findByIdAndDelete(
      req.params.id,
      (err, deletedCollab) => {
        if (err) return console.log(err);
        console.log(deletedCollab);

        // res.send(deletedCollab);
        // res.redirect('/collaborators');
      });
    res.redirect('/collaborators');
    });
  } else {
    promptString = `${req.params.name} cannot be deleted`;
    res.redirect('/collaborators');
  };
});

// *DEBUG*/show-collabs route
router.get('/debug/show-collabs', (req, res) => {
  db.Collaborator.find({}, (err, allCollabs) => {
    if (err) return console.log(err);
    console.log(allCollabs);

    res.send(allCollabs);
    // res.send(JSON.stringify(allCollabs));
    // res.send(JSON.stringify(allCollabs, undefined, 4))
  });
});

// *DEBUG*/clear route
router.get('/debug/clear', (req, res) => {
  db.Collaborator.deleteMany({}, (err, deletedCollabs) => {
    if (err) return console.log(err);
    console.log(`deleted tasks... ${deletedCollabs}`);

      res.redirect('/collaborators');
    });
  });



module.exports = router;