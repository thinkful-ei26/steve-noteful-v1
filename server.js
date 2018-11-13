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

app
  .listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  })
  .on('error', err => {
    console.error(err);
  });
