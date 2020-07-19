const mongoose = require('mongoose');
const Task = require('./Task');
const Project = require('./Project');

const collabSchema = new mongoose.Schema({
  name: {
    //for now this is the user
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  pic_url: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: mongoose.Schema.Types.ObjectId,
    },
  ],
});


const collabModel = mongoose.model('Collaborator', collabSchema);

module.exports = collabModel;