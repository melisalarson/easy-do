const express = require('express');
const db = require('../models');
const router = express.Router();
const unassignedCollab = "ID";

// 1)task INDEX route
  router.get('/', (req, res) => {
  db.Task.find({})
  .populate({path: 'collaborators'})
  .exec((err, allTasks) => {
    if (err) return console.log(err);
    console.log(allTasks);

    res.render('tasks', { tasks: allTasks });
  });
});

// 2)task NEW route
router.get('/new', (req, res) => {
  db.Collaborator.find(
    {},
    (err, allCollabs) => {
      if (err) return console.log(err);
      console.log(allCollabs);

      res.render('tasks/new', {collabs: allCollabs});
    });
});

// 4)task SHOW route
router.get('/:id', (req, res) => {
  db.Collaborator.findOne({'tasks': req.params.id})
    .populate({ path: 'tasks', match: {_id:req.params.id} })
    .exec((err, foundCollab) => {
      if (err) return console.log(err);
      console.log(foundCollab);

      res.render('collaborators/show',
      { tasks: foundCollab.tasks[0], collab: foundCollab });
    });
});

// 3)task CREATE route
router.post('/', (req, res) => {
  db.Task.create(
    req.body,
    (err, newTask) => {
      if (err) return console.log(err);
      
      db.Collaborator.findById(
        req.body.collaborators,
        (err, foundCollab) => {
          if (err) return console.log(err);
          
          foundCollab.tasks.push(newTask);
          foundCollab.save(
            (err, savedCollab) => {
              if (err) return console.log(err);
              console.log(savedCollab);

              res.redirect("/tasks");
            });
          });
      });
});

// 5)task EDIT route
router.get('/:id/edit', (req, res) => {
  db.Task.findById(req.params.id)
  .populate({path: 'collaborators'})
  .exec((err, taskToEdit) => {
      if (err) return console.log(err);

      db.Collaborator.find(
        {},
        (err, allCollabs) => {
          if (err) return console.log(err);
          console.log(allCollabs);

          res.render('tasks/edit', { task: taskToEdit, collabs: allCollabs });
      });
  });
});

// 6)task UPDATE route
router.put('/:id', (req, res) => {
  db.Task.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {new: true},
    (err, taskToUpdate) => {
      if (err) return console.log(err);
      console.log(taskToUpdate);
      
      res.redirect('/tasks');
  });
});

// 7)task DESTROY route
router.delete('/:id', (req, res) => {
  db.Task.findByIdAndDelete(
    req.params.id,
    (err, deletedTask) => {
      if (err) return console.log(err);
      console.log(deletedTask);

      res.redirect('/tasks');
    });
});

// task MOVE RIGHT route
router.get('/:id/move-right/:stage', (req, res) => {  
  let change = {};
  if (req.params.stage === 'to-do') {
    change = { stage: 'in-progress' }
  } if (req.params.stage === 'in-progress') {
    change = { stage: 'completed' }
  }

  db.Task.findByIdAndUpdate(
    req.params.id,
    change,
    {new: true},
    (err, taskToMoveRight) => {
      if (err) return console.log(err);
      console.log(taskToMoveRight)

      res.redirect('/tasks')
    });
});

// task MOVE LEFT route
router.get('/:id/move-left/:stage', (req, res) => {
  let change = {};
  if (req.params.stage === 'completed') {
    change = { stage: 'in-progress' }
  } else if (req.params.stage === 'in-progress') {
    change = { stage: 'to-do' }
  }

  db.Task.findByIdAndUpdate(
    req.params.id,
    change,
    { new: true },
    (err, taskToMoveLeft) => {
      if (err) return console.log(err);
      console.log(taskToMoveLeft)

      res.redirect('/tasks')
    });
});

// *DEBUG*/show-tasks route
router.get('/debug/show-tasks', (req, res) => {
  db.Task.find({}, (err, allTasks) => {
    if (err) return console.log(err);
    console.log(allTasks);

    res.send(allTasks);
    // res.send(JSON.stringify(allTasks));
    // res.send(JSON.stringify(allTasks, undefined, 4))
  });
});

// *DEBUG*/add-task route part1
router.get('/debug/add-tasks', (req, res) => {
    res.send(
      `<form action="/tasks/debug/add-tasks" method="POST">
        <textarea id="jsonString" name="jsonString"></textarea>
        <button type="submit">Add Tasks</button>
      </form>`
    );
});
// *DEBUG*/add-task route part2
router.post('/debug/add-tasks', (req, res) => {
  const jsonObj = JSON.parse(req.body.jsonString);
  console.log(jsonObj);
  
  db.Task.insertMany(
    jsonObj,
    (err, jsonObject) => {    
      if (err) return console.log(err);
      console.log(jsonObject);

      res.redirect('/');
    });
});

// *DEBUG*/reset route
// router.get('/debug/reset', (req, res) => {
//     db.Task.deleteMany({}, (err, deletedTasks) => {
//       if (err) return console.log(err);
//       console.log(`deleted tasks... ${deletedTasks}`);

//       const sampleData = require('../models/sampleData');

//       db.Task.insertMany(sampleData, (err, sampleData) => {
//         if (err) return console.log(err);
//         console.log(`sample data... ${sampleData}`);
        
//         res.redirect('/tasks');
//       });
//   });
// });

// *DEBUG*/clear route
router.get('/debug/clear', (req, res) => {
  db.Task.deleteMany({}, (err, deletedTasks) => {
    if (err) return console.log(err);
    console.log(`deleted tasks... ${deletedTasks}`);

      res.redirect('/tasks');
    });
  });


module.exports = router;