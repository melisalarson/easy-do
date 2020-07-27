const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4001;

// controllers
const collaboratorsCtrl = require('./controllers/collaboratorsController');
const tasksCtrl = require('./controllers/tasksController');
const authCtrl = require('./controllers/authController');
const usersCtrl = require('./controllers/usersController');
const projectsCtrl = require("./controllers/projectsController");


//view
app.set('view engine', 'ejs');

//middleware
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'meow',
  resave: false,  //resave every request
  saveUninitialized: false, // track unauthenticated users
  cookie: {macAge: 1000*60*60*24*7*2}  //expires in 2 weeks
}));
app.use(function(req, res, next) {
  if (req.path !== "/login" && req.path !== "/register" && req.session.currentUser == null){
      res.redirect('/login');
  }   else{
      next();
  }
});

//routes
app.get('/', (req, res) => { res.redirect("/login"); });

app.use('/', authCtrl);  //auth route
app.use('/profile', usersCtrl);  //users route

app.use('/collaborators', collaboratorsCtrl);
app.use('/tasks', tasksCtrl);
app.use('/projects', projectsCtrl);

app.get('*', (req, res) => {
  res.send(`<h1>404 ERROR <br> PAGE NOT FOUND</h1>`)
});

//server listener
app.listen(PORT, () => console.log(`server is running on port ${PORT}`)); 