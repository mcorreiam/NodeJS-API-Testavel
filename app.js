const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const datasource = require('./config/datasource');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authorization = require('./auth');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

module.exports = app;
