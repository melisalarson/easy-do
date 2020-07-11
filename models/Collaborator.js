const mongoose = require('mongoose');

const collabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  tasks: [{
    type: mongoose.Schema.Types(ObjectId),
    ref: 'Task',
  }],
});

const collabModel = mongoose.model('Task', CollabSchema);

module.exports(collabModel);