const express = require('express');
const router = express.Router();
const db = require('../models');

// 1)collab index route
router.get('/', (req, res) => {
  db.Collaborator.find({}, (err, allCollabs) => {
    if (err) return console.log(err);
    console.log(allCollabs);
    
    res.render('collaborators', { collabs: allCollabs })
  });
});

// 2)collab new route
router.get('/new', (req, res) => {
  res.render('collaborators/new');
});

// 4)collab show route
router.get('/:id', (req, res) => {
  db.Collaborator.findById(
    req.params.id,
      (err, foundCollab) => {
      if (err) return console.log(err);
      console.log(foundCollab);

        res.send(foundCollab);
    });
    // .populate({ path: 'Task' })
    // .exec((err, foundCollab) => {
    //   if (err) return console.log(err);
    //   console.log(foundCollab);

    //   res.render('collaborators/show', {collabs: foundCollab });
    // });
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
router.get('/:id/edit', (req, res) => {
  db.Collaborator.findById(
    req.params.id,
    (err, collabToEdit) => {
      if (err) return console.log(err);
      console.log(collabToEdit);

      // res.send(collabToEdit);
      res.render('collaborators/edit', {collab: collabToEdit });
    });
});

// 6)collab update route
router.put('/:id', (req, res) => {
  db.Collaborator.findByIdAndUpdate(
    req.params.id,
    {name: 'Jimmy'},
    // req.body,
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
  db.Collaborator.findByIdAndDelete(
    req.params.id,
    (err, deletedCollab) => {
      if (err) return console.log(err);
      console.log(deletedCollab);

      // res.send(deletedCollab);
      res.redirect('/collaborators');
  });
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