const express = require('express');
const router = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const objId = mongoose.Types.ObjectId;
const notAssignedCollabId = '5f0cd8b9fed32e492a3170c1';

let promptString = null;

// 1)collab INDEX route
router.get('/:p_id', (req, res) => {
  db.Project.findById(req.params.p_id)
  .populate({path: 'collaborators'})
  .exec((err, project) => {
    if (err) return console.log(err);
    console.log(project);
    
    db.Collaborator.find({}, (err, allCollabs) => {
      if (err) return console.log(err);
      console.log(allCollabs)
      res.render('collaborators', { collabs: project.collaborators, 
                                    project_id: req.params.p_id,
                                    allCollabs});
      promptString = null;

    });
  });
});
// // ?????????? users ??????????
// router.get('/', (req, res) => {
//   db.User.findById(
//     req.session.currentUser._id,
//     (err, foundUser) => {
//       if (err) return console.log(err);

//       res.render('users/profile', {user: foundUser})
//     });
// });



// 2)collab NEW route WITH SESSION
router.get("/:p_id/new", (req, res) => {
  console.log(req.session);

  if (!req.session.currentUser) return res.redirect("/login");
  if (!req.session.currentUser) {
    res.redirect('/login');
  } else {
    res.render('/collaborators/new');
  }

  res.render("/collaborators/new");
});

// 4)collab SHOW route
// router.get('/:p_id/:c_id', (req, res) => {
//   db.Collaborator.findById(
//     req.params.c_id)
//     .populate({ path: 'tasks' })
//     .exec((err, foundCollab) => {
//       if (err) return console.log(err);
//       console.log(foundCollab);

//       res.render('collaborators/show', { collab: foundCollab });
//     });
// });

// 3)collab CREATE route
router.post('/:p_id', (req, res) => {
  db.Project.findById(req.params.p_id, (err, project) =>{
    if (err) return console.log(err);
    project.collaborators.push(req.body.collaborators);
    project.save((err, savedProject) => {
      if (err) return console.log(err);
      console.log(savedProject);
      res.redirect('/collaborators/'+req.params.p_id);
    });
  });
});

// 5)collab EDIT route
router.get("/:p_id/:c_id/edit", (req, res) => {
  db.Collaborator.find({project: req.params.p_id}, (err, allCollabs) => {
    if (err) return console.log(err);
    
    if (req.params.c_id !== notAssignedCollabId) {
    db.Collaborator.findById(
      req.params.c_id,
      (err, collabToEdit) => {
      if (err) return console.log(err);

      res.render("collaborators/edit", {
        collabs: allCollabs,
        selectedCollab: collabToEdit,
        promptString,
      });
      promptString = null;
      });
      } else {
      promptString = `${req.params.id} cannot be edited`;
      res.render("collaborators/edit", {
        collabs: allCollabs,
        selectedCollab: collabToEdit,
        promptString,
      });
      };
    });
  });

// 6)collab UPDATE route
router.put('/:p_id/:id', (req, res) => {
  db.Collaborator.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, collabToUpdate) => {
      if (err) return console.log(err);
      
      res.redirect('/collaborators');
  });
});

// 7)collab DESTROY route
router.delete('/:p_id/:t_id', (req, res) => {
  if (req.params.id !== notAssignedCollabId) { 

    db.Project.findById(req.params.p_id, (err, project) =>{
      if (err) return console.log(err);
      const index = project.collaborators.indexOf(objId(req.params.t_id))
      if (index > -1) {
        project.collaborators.splice(index, 1);
      }

      project.save((err, savedProject) => {
        if (err) return console.log(err);
        console.log(savedProject);
        res.redirect('/collaborators/'+req.params.p_id);
      });

  // db.Task.updateMany(
  //   {collaborators: [mongoose.Types.ObjectId(req.params.id)]},
  //   {collaborators : [mongoose.Types.ObjectId(notAssignedCollabId)]},
  //   (err, updatedCollab) => {
  //     if (err) return console.log(err);

  //   db.Collaborator.findByIdAndDelete(
  //     req.params.id,
  //     (err, deletedCollab) => {
  //       if (err) return console.log(err);
  //       console.log(deletedCollab);

  //       // res.send(deletedCollab);
  //       // res.redirect('/collaborators');
  //     });
  //   res.redirect('/collaborators');
    });
  } else {
    promptString = `${req.params.name} cannot be deleted`;
    res.redirect('/collaborators');
  };
});

// *DEBUG*/show-collabs route
router.get('/:p_id/debug/show-collabs', (req, res) => {
  db.Collaborator.find({}, (err, allCollabs) => {
    if (err) return console.log(err);
    console.log(allCollabs);

    res.send(allCollabs);
    // res.send(JSON.stringify(allCollabs));
    // res.send(JSON.stringify(allCollabs, undefined, 4))
  });
});

// *DEBUG*/clear route
router.get('/:p_id/debug/clear', (req, res) => {
  db.Collaborator.deleteMany({}, (err, deletedCollabs) => {
    if (err) return console.log(err);
    console.log(`deleted tasks... ${deletedCollabs}`);

      res.redirect('/collaborators');
    });
  });


module.exports = router;