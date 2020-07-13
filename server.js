const express = require('express');
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 4001;

// controllers
const collaboratorsCtrl = require('./controllers/collaboratorsController');
const tasksCtrl = require('./controllers/tasksController');

//view
app.set('view engine', 'ejs');

//middleware
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

//routes
app.get('/', (req, res) => { res.redirect('/tasks') });
app.use('/collaborators', collaboratorsCtrl);  // '/collaborators' = this is the url path the user is going to 
app.use('/tasks', tasksCtrl);  // '/tasks' = this is the url path the user is going to
app.get('*', (req, res) => {
  res.send(`<h1>404 ERROR <br> PAGE NOT FOUND</h1>`)
});

//server listener
app.listen(PORT, () => console.log(`server is running on port ${PORT}`)); 