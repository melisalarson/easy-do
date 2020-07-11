const express = require('express');
const router = express.Router();
const db = require('../models');


// 1)task index route
router.get('/', (req, res) => {
  db.Task.find({}, (err, allTasks) => {
    if (err) return console.log(err);
    console.log(allTasks);
    
    res.render('tasks/index', { allTasks });
  });
});

// 2)task new route
router.get('/new', (req, res) => {
  
  res.render('tasks/new');
});

// 4)task show route
router.get('/:id', (req, res) => {
  db.Task.findById(req.params.id)
    .populate({ path: 'collaborators' })
    .exec((err, foundTask) => {
      if (err) return console.log(err);
      console.log(foundTask);
      
      res.render('tasks/show');
    });
});

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