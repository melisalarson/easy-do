const express = require("express");
const router = express.Router();
const db = require("../models");


// 1)project INDEX route (with populate)
  router.get('/', (req, res) => {
  db.Project.find({})
  .populate({path: 'collaborators'})
  .exec((err, allProjects) => {
    if (err) return console.log(err);

    res.render('projects', { projects: allProjects });
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
  db.Project.create(
    req.body,
    (err, newProject) => {
      if (err) return console.log(err);
      
      db.Collaborator.findById(  // should this be find many?
        req.body.collaborators,
        (err, foundCollab) => {
          if (err) return console.log(err);
          
          foundCollab.projects.push(newProject);
          foundCollab.save(
            (err, savedCollab) => {
              if (err) return console.log(err);
              console.log(savedCollab);
            });
            res.redirect("/tasks");
          });
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