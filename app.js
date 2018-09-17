
const debug = require('debug')('app:startup');

const express = require('express');

const helmet = require('helmet');

const logger = require('./middleware/logger');

const auth = require('./middleware/auth');

const home = require('./routes/home');

const courses = require('./routes/courses');

const morgan = require('morgan');

const DEVELOPMENT = 'development';

const isOnDevelopment = () => app.get('env') === DEVELOPMENT;

const app = express();

// SET TEMPLATING ENGINE
app.set('view engine', 'pug');

// Optional
app.set('views', './views'); // default /views

// Enable middleware for request pipeline
// so that we can set request.body
// parse request body
app.use(express.json());

// Set our own middleware
app.use(logger);

// Set our own middleware for auth
app.use(auth);

// Enable url encoded payload
app.use(express.urlencoded({ extended: true }));

// Serve static file
app.use(express.static('public'));

app.use(helmet());

app.use('/', home);

app.use('/api/courses', courses);

if (isOnDevelopment()) {
    
    app.use(morgan('tiny'));

    debug('Morgan enabled...')
}

// DB WORK
debug('Connected to the database');
// console.log('Application Name: ' + config.get('name'));
// console.log('Application Mail: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// ENVIRONMENT VARIABLE
// process.env
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// app.get('env'); // return development by default
// console.log(`app: ${app.get('env')}`);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
