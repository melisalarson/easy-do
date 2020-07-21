const express = require('express');
const db = require('../models');
const router = express.Router();
const mongoose = require('mongoose');
const objId = mongoose.Types.ObjectId;

//TURN OFF FOR REMOTE DB AND MASTER
const debug = true;

// 1)task INDEX route
  router.get('/:p_id', (req, res) => {
  db.Task.find({project: req.params.p_id})
  .populate({path: 'collaborators',})
  .exec((err, allTasks) => {
    if (err) return console.log(err);
    db.Project.findById(req.params.p_id, (err, project) => {
        if (err) return console.log(err);
        console.log(project);
  
        res.render('tasks', { tasks: allTasks, project_id: req.params.p_id, project_name: project.name})      });;
  });
});

// 2)task NEW route
router.get('/:p_id/new', (req, res) => {
  db.Project.findById(req.params.p_id)
  .populate({path: 'collaborators'})
  .exec((err, project) => {
      if (err) return console.log(err);
      console.log(project);

      res.render('tasks/new', {collabs: project.collaborators, project_id: req.params.p_id, currentUserName: req.session.currentUser.name});
    });
});

// 4)task SHOW route
// router.get('/:p_id/:t_id', (req, res) => {
//   db.Collaborator.findOne({'tasks': req.params.id})
//     .populate({ path: 'tasks', match: {_id:req.params.id} })
//     .exec((err, foundCollab) => {
//       if (err) return console.log(err);
//       console.log(foundCollab);

//       res.render('collaborators/show',
//       { tasks: foundCollab.tasks[0], collab: foundCollab });
//     });
// });

// 3)task CREATE route
router.post('/:p_id/', (req, res) => {
  newTask = req.body;
  newTask.project = objId(req.params.p_id)
  db.Task.create(
    newTask,
    (err, createdTask) => {
      if (err) return console.log(err);
      
      db.Collaborator.findById(
        req.body.collaborators,
        (err, foundCollab) => {
          if (err) return console.log(err);
          
          foundCollab.tasks.push(createdTask);
          foundCollab.save(
            (err, savedCollab) => {
              if (err) return console.log(err);
              console.log(savedCollab);
              console.log(createdTask);

              res.redirect(`/tasks/${req.params.p_id}`);
            });
          });
      });
});

// 5)task EDIT route
router.get('/:p_id/:t_id/edit', (req, res) => {
  db.Task.findById(req.params.t_id)
  .populate({path: 'collaborators'})
  .exec((err, taskToEdit) => {
      if (err) return console.log(err);

      db.Project.findById(req.params.p_id)
      .populate({path: 'collaborators'})
      .exec((err, project) => {
          if (err) return console.log(err);
          console.log(project);

          res.render('tasks/edit', { task: taskToEdit, collabs: project.collaborators, project_id: project._id });
      });
  });
});

// 6)task UPDATE route
router.put('/:p_id/:id', (req, res) => {
  db.Task.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {new: true},
    (err, taskToUpdate) => {
      if (err) return console.log(err);
      console.log(taskToUpdate);
      
      res.redirect('/tasks/'+req.params.p_id)
  });
});

// 7)task DESTROY route
router.delete('/:p_id/:t_id', (req, res) => {
  db.Task.findByIdAndDelete(
    req.params.t_id,
    (err, deletedTask) => {
      if (err) return console.log(err);
      console.log(deletedTask);

      res.redirect('/tasks/'+req.params.p_id)
    });
});

// task MOVE RIGHT route
router.get('/:p_id/:t_id/move-right/:stage', (req, res) => {  
  let change = {};
  if (req.params.stage === 'to-do') {
    change = { stage: 'in-progress' }
  } if (req.params.stage === 'in-progress') {
    change = { stage: 'completed' }
  }

  db.Task.findByIdAndUpdate(
    req.params.t_id,
    change,
    {new: true},
    (err, taskToMoveRight) => {
      if (err) return console.log(err);
      console.log(taskToMoveRight)

      res.redirect('/tasks/'+req.params.p_id)
    });
});

// task MOVE LEFT route
router.get('/:p_id/:t_id/move-left/:stage', (req, res) => {
  let change = {};
  if (req.params.stage === 'completed') {
    change = { stage: 'in-progress' }
  } else if (req.params.stage === 'in-progress') {
    change = { stage: 'to-do' }
  }

  db.Task.findByIdAndUpdate(
    req.params.t_id,
    change,
    { new: true },
    (err, taskToMoveLeft) => {
      if (err) return console.log(err);
      console.log(taskToMoveLeft)

      res.redirect('/tasks/'+req.params.p_id)
    });
});

if(debug === true){
  // *DEBUG*/show-tasks route
  router.get('/:p_id/debug/show-tasks', (req, res) => {
    db.Task.find({}, (err, allTasks) => {
      if (err) return console.log(err);
      console.log(allTasks);

      res.send(allTasks);
      // res.send(JSON.stringify(allTasks));
      // res.send(JSON.stringify(allTasks, undefined, 4))
    });
  });

  // *DEBUG*/add-task route part1
  router.get('/:p_id/debug/add-tasks', (req, res) => {
      res.send(
        `<form action="/tasks/debug/add-tasks" method="POST">
          <textarea id="jsonString" name="jsonString"></textarea>
          <button type="submit">Add Tasks</button>
        </form>`
      );
  });
  // *DEBUG*/add-task route part2
  router.post('/:p_id/debug/add-tasks', (req, res) => {
    const jsonObj = JSON.parse(req.body.jsonString);
    console.log(jsonObj);

    db.Task.insertMany(
      jsonObj,
      (err, jsonObject) => {    
        if (err) return console.log(err);
        console.log(jsonObject);

        res.redirect('/tasks/'+req.params.p_id)
      });
  });

  // *DEBUG*/reset route
  router.get(':p_id/debug/reset', (req, res) => {
      db.Task.deleteMany({}, (err, deletedTasks) => {
        if (err) return console.log(err);
        console.log(`deleted tasks... ${deletedTasks}`);

        const sampleData = require('../models/sampleData');

        db.Task.insertMany(sampleData, (err, sampleData) => {
          if (err) return console.log(err);
          console.log(`sample data... ${sampleData}`);

       res.redirect('/tasks/'+req.params.p_id)
        });
    });
  });

  // *DEBUG*/clear route
  router.get('/:p_id/debug/clear', (req, res) => {
    db.Task.deleteMany({}, (err, deletedTasks) => {
      if (err) return console.log(err);
      console.log(`deleted tasks... ${deletedTasks}`);

      res.redirect('/tasks/'+req.params.p_id)
      });
    });

  // *DEBUG*/add-na route
  router.get('/:p_id/debug/add-na', (req, res) => {
    naCollab = {
      _id: objId("5f0cd8b9fed32e492a3170c1"),
      name: 'N/A',
      email: 'fakeemail@me.com',
      password: 'p@ssword',
      pic_url: 'https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg'
    }
    db.Collaborator.create(
      naCollab,
      (err, jsonObject) => {    
        if (err) return console.log(err);
        console.log(jsonObject);

        res.redirect('/tasks/'+req.params.p_id)
      });
    });
}

module.exports = router;