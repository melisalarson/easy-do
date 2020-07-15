const mongoose = require('mongoose');
// const MONGODB_URI = ('mongodb://localhost:27017/easy-do-db-test');
MONGODB_URI = 'mongodb://app:UPrIJaqCeZz5v71v@cluster0-shard-00-00.judrx.mongodb.net:27017,cluster0-shard-00-01.judrx.mongodb.net:27017,cluster0-shard-00-02.judrx.mongod b.net:27017/easy-do?ssl=true&replicaSet=atlas-ljx4vy-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
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