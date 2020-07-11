const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collaborators: String, //[{
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'Collaborator',
  //}],
  completionTime: String,
  stage: String,
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;