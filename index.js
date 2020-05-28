// var express = require('express');
const app = require('./app');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);
});
