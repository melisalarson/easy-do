const mongoose = require('mongoose');
const connectionString = ('mongodb://localhost:27017/easy-do-db');
mongoose.connect(connectionString, {
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
};