const mongoose = require('mongoose');
require('dotenv').config();

// localdb comment lines 5/6 and uncomment line 8 for remote db
const MONGODB_URI = ('mongodb://localhost:27017/easy-do-db');
mongoose.connect(MONGODB_URI, {

// mongoose.connect(process.env.MONGODB_MJ, {
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