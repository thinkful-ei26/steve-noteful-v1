'use strict';
const express = require('express');
const data = require('./db/notes');
const { PORT } = require('./conifg');
const { logger } = require('./middleware/logger');

// console.log(data);
const app = express();

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  if (req.query.searchTerm) {
    const filteredList = data.filter(elements =>
      elements.title.includes(req.query.searchTerm)
    );
    console.log(req.query.searchTerm);
    console.log(filteredList);

    res.json(filteredList);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const myNote = data.find(element => {
    return element.id === parseInt(req.params.id);
  });
  res.json(myNote);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Page Not found' });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app
  .listen(PORT, function() {
    console.info(`Server listening on ${PORT}`);
  })
  .on('error', err => {
    console.error(err);
  });
