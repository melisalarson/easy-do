const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = ('mongodb://localhost:27017/easy-do-db');

mongoose.connect(/*process.env.*/MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then( () => console.log('succesful connection') )
  .catch( (err) => console.log(`connection failed: ${err}`) )

module.exports = {
  Collaborator: require('./Collaborator'),
  Task: require('./Task'),
  User: require('./User'),
};