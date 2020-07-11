const express = require('express');
const router = express.Router();
const db = require('../models');

const sampleData = 
  [
    { name: 'Model folder -> Collaborator file', collaborators: 'Melisa', completionTime: '1 hour', stage: 'to-do' },
    { name: 'Model folder -> Task file', collaborators: 'Melisa', completionTime: '2 hour', stage: 'to-do' },
    { name: 'Controllers folder -> task file', collaborators: 'Melisa', completionTime: '3 hour', stage: 'to-do' },
    { name: 'Controllers folder -> collaborator file', collaborators: 'Melisa', completionTime: '4 hour', stage: 'to-do' },
    { name: 'Views folder -> index file', collaborators: 'Jimmy', completionTime: '5 hour', stage: 'to-do' },
    { name: 'Views folder -> tasks folder -> index file', collaborators: 'Jimmy', completionTime: '6 hour', stage: 'to-do' },
    { name: 'Views folder -> tasks folder -> new file', collaborators: 'Jimmy', completionTime: '7 hour', stage: 'to-do' },
    { name: 'Views folder -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '8 hour', stage: 'to-do' },
    { name: 'Views folder -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '9 hour', stage: 'to-do' },
  ];

// 1)task index route
router.get('/', (req, res) => {
  // db.Task.find({}, (err, allTasks) => {
    // if (err) return console.log(err);
    // console.log(allTasks);
    res.render('tasks/index', {tasks: sampleData}); //{ allTasks });
  // });
});

// 2)task new route
router.get('/new', (req, res) => {
  
  res.render('tasks/new');
});

// 4)task show route
// router.get('/:id', (req, res) => {
//   db.Task.findById(req.params.id, (err, foundTast) => {
//     if (err) return console.log
//   }
    
    
//     )
//     // .populate({ path: 'collaborators' })
//     // .exec((err, foundTask) => {
//     //   if (err) return console.log(err);
//     //   console.log(foundTask);
      
//       // res.render('tasks/show');
//     // });
// });

// 3)task create route
router.post('/', (req, res) => {
  db.Task.create(
    req.body,
    (err, newTask) => {
      if (err) return console.log(err);
      console.log(newTask);
      
      res.redirect('/tasks');
  });
});

// 5)task edit route
router.get('/:id/edit', (req, res) => {
  db.Task.findById(
    req.params.id,
    (err, taskToEdit) => {
      if (err) return console.log(err);
      console.log(taskToEdit);
      
      res.render('tasks/edit', {foundTask})
  });
});

// 6)task update route
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

// 7)task destroy route
router.delete('/:id', (req, res) => {
  db.Task.findByIdDelete(
    req.params.id,
    (err, deletedTask) => {
      if (err) return console.log(err);
      console.log(deletedTask);
      res.redirect('/tasks');
    });
});


module.exports = router;