const mongoose = require('mongoose');
const Collaborator = require('./Collaborator');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collaborator',
  }],
  completionTime: String,
  stage: String,
}, {timestamps: true});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;