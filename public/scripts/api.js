/* global $ */
'use strict';

const api = {
<<<<<<< HEAD
  search: function(query, callback) {
=======

  search: function (query, callback) {
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query,
      success: callback
    });
  },

<<<<<<< HEAD
  details: function(id, callback) {
=======
  details: function (id, callback) {
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
      success: callback
    });
<<<<<<< HEAD
  },

  update: function(id, obj, callback) {
    $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: callback
    });
  },

  remove: function(id, callback) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/notes/${id}`,
      dataType: 'json',
      success: callback
    });
=======
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
  }
};
