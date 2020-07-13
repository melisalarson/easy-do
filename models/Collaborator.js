const mongoose = require('mongoose');

const collabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pic_url: String,
  tasks: String, //[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Task',
  // }],
});

const collabModel = mongoose.model('Collaborator', collabSchema);

module.exports = collabModel;