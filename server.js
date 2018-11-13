'use strict';
const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./conifg');
const logger = require('./middleware/logger');

// EXPRESS
const app = express();
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

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

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
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
