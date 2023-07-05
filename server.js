// load .env data into process.env
require('dotenv').config();

// Web server config
const cookieSession = require('cookie-session');
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');



const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(
  cookieSession({
    name: 'session',
    keys: ['barney', 'is', 'a', 'dinosaur', 'mary had a little', 'lamb'],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/users-api');
// const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/loginRoute');
const signUpRoutes = require('./routes/sign-up-route');
const homeRoutes = require('./routes/home-route');
const resourceRoutes = require('./routes/resource');
const resourcesRoutes = require('./routes/resources-api');
const addResourceRoutes = require('./routes/add-resource');
const userApiRoutes  = require('./routes/user-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signUpRoutes);
app.use('/home', homeRoutes);
app.use('/resource',resourceRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/add', addResourceRoutes);
app.use('/api/user', userApiRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
