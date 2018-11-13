'use strict';
const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./conifg');
const { logger } = require('./middleware/logger');

// console.log(data);
const app = express();

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/notes/:id', (req, res) => {
  notes.find(parseInt(req.params.id), (err, note) => {
    if (err) {
      console.error('error find');
    } else {
      console.log(note);
      res.json(note);
    }
  });
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
