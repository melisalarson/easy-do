const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require('mongoose');
const notAssignedCollabId = mongoose.Types.ObjectId('5f0cd8b9fed32e492a3170c1');
const objId = mongoose.Types.ObjectId;

// 1)project INDEX route (with populate)
  router.get('/', (req, res) => {
  db.Project.find({collaborators: req.session.currentUser._id})
  .populate({path: 'collaborators'})
  .exec((err, allProjects) => {
    if (err) return console.log(err);

    res.render('projects/index', { projects: allProjects });
  });
});

// 2)project NEW route
router.get('/new', (req, res) => {
  db.Collaborator.find(
    {},
    (err, allCollabs) => {
      if (err) return console.log(err);
      console.log(allCollabs);

      res.render('projects/new', {collabs: allCollabs});
    });
});

// 3)project CREATE route
router.post('/', (req, res) => {
  newProject = req.body;
  newProject.collaborators = [];
  newProject.collaborators.push(objId(req.session.currentUser._id));
  newProject.collaborators.push(notAssignedCollabId);
  newProject.owner = objId(req.session.currentUser._id);
  console.log(newProject);
  db.Project.create(
    newProject,
    (err, createdProject) => {
      if (err) return console.log(err);
      res.redirect("/tasks/"+createdProject._id);
  });
});

// 5)project EDIT route
router.get('/:id/edit', (req, res) => {
  db.Project.findById(req.params.id)
  .populate({path: 'collaborators'})
  .exec((err, projectToEdit) => {
      if (err) return console.log(err);

      db.Collaborator.find(
        {},
        (err, allCollabs) => {
          if (err) return console.log(err);
          console.log(allCollabs);

          res.render('projects/edit', { project: projectToEdit, collabs: allCollabs });
      });
  });
});

// 6)project UPDATE route
router.put('/:id', (req, res) => {
  db.Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, projectToUpdate) => {
      if (err) return console.log(err);
      console.log(projectToUpdate)
      
      res.redirect('/projects');
  });
});


module.exports = router;