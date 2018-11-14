'use strict';
const express = require('express');

const { PORT } = require('./conifg');
const logger = require('./middleware/logger');
const router = require('./Routes/notes.router');

// EXPRESS
const app = express();

app.use(express.json());
app.use('/api/notes', router);

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
