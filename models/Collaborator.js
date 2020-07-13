const mongoose = require('mongoose');
const Task = require('./Task');

const collabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pic_url: String,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

const collabModel = mongoose.model('Collaborator', collabSchema);

module.exports = collabModel;