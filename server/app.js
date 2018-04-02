const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const todosRouter = require('./todos-router.js');
const apiTodosRouter = require('./api-todos-router.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/todos/user', todosRouter);
app.use('/api/todos/user', apiTodosRouter);

app.use(express.static(path.resolve('public')));

app.get('/', (req, res, next) => res.sendFile('index.html', {root: path.resolve('public')}));

app.get('*', (req, res, next) => res.sendStatus(404));
app.use((err, req, res, next) => res.sendStatus(500));

module.exports = app;
