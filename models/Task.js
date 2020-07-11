const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collaborators: [{
    type: mongoose.Schema.Types(ObjectId),
    ref: 'Collaborator',
  }],
  completionTime: String,
  stage: String,
});

const taskModel = mongoose.model('Task', //taskSchema);
  [
    { name: 'Model folder -> Collaborator file', collaborators: 'Melisa', completionTime: '1 hour', stage: 'to-do'},
    { name: 'Model folder -> Task file', collaborators: 'Melisa', completionTime: '2 hour', stage: 'to-do'},
    { name: 'Controllers folder -> task file', collaborators: 'Melisa', completionTime: '3 hour', stage: 'to-do'},
    { name: 'Controllers folder -> collaborator file', collaborators: 'Melisa', completionTime: '4 hour', stage: 'to-do'},
    { name: 'Views folder -> index file', collaborators: 'Jimmy', completionTime: '5 hour', stage: 'to-do'},
    { name: 'Views folder -> tasks folder -> index file', collaborators: 'Jimmy', completionTime: '6 hour', stage: 'to-do'},
    { name: 'Views folder -> tasks folder -> new file', collaborators: 'Jimmy', completionTime: '7 hour', stage: 'to-do'},
    { name: 'Views folder -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '8 hour', stage: 'to-do'},
    { name: 'Views folder -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '9 hour', stage: 'to-do'},
  ]
);

module.exports(taskModel);