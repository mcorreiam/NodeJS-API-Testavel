const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const datasource = require('./config/datasource');
const booksRouter = require('./routes/books');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());
const { Books } = app.datasource.models;
booksRouter(app, Books);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;
