<<<<<<< HEAD
const noteful = (function() {
  function render() {
=======
/* global $ store api */
'use strict';

const noteful = (function () {

  function render() {

>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    const notesList = generateNotesList(store.notes, store.currentNote);
    $('.js-notes-list').html(notesList);

    const editForm = $('.js-note-edit-form');
    editForm.find('.js-note-title-entry').val(store.currentNote.title);
    editForm.find('.js-note-content-entry').val(store.currentNote.content);
  }

  /**
   * GENERATE HTML FUNCTIONS
   */
  function generateNotesList(list, currentNote) {
<<<<<<< HEAD
    const listItems = list.map(
      item => `
    <li data-id="${item.id}" class="js-note-element ${
        currentNote.id === item.id ? 'active' : ''
      }">
      <a href="#" class="name js-note-show-link">${item.title}</a>
      <button class="removeBtn js-note-delete-button">X</button>
    </li>`
    );
=======
    const listItems = list.map(item => `
    <li data-id="${item.id}" class="js-note-element ${currentNote.id === item.id ? 'active' : ''}">
      <a href="#" class="name js-note-show-link">${item.title}</a>
      <button class="removeBtn js-note-delete-button">X</button>
    </li>`);
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    return listItems.join('');
  }

  /**
   * HELPERS
   */
  function getNoteIdFromElement(item) {
<<<<<<< HEAD
    const id = $(item)
      .closest('.js-note-element')
      .data('id');
=======
    const id = $(item).closest('.js-note-element').data('id');
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    return id;
  }

  /**
   * EVENT LISTENERS AND HANDLERS
   */
  function handleNoteItemClick() {
    $('.js-notes-list').on('click', '.js-note-show-link', event => {
      event.preventDefault();

      const noteId = getNoteIdFromElement(event.currentTarget);

      api.details(noteId, detailsResponse => {
        store.currentNote = detailsResponse;
        render();
      });
<<<<<<< HEAD
=======

>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    });
  }

  function handleNoteSearchSubmit() {
    $('.js-notes-search-form').on('submit', event => {
      event.preventDefault();

      const searchTerm = $('.js-note-search-entry').val();
      store.currentSearchTerm = searchTerm ? { searchTerm } : {};

      api.search(store.currentSearchTerm, searchResponse => {
        store.notes = searchResponse;
        render();
      });
<<<<<<< HEAD
=======

>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    });
  }

  function handleNoteFormSubmit() {
<<<<<<< HEAD
    $('.js-note-edit-form').on('submit', function(event) {
      event.preventDefault();

      const editForm = $(event.currentTarget);

      const noteObj = {
        id: store.currentNote.id,
        title: editForm.find('.js-note-title-entry').val(),
        content: editForm.find('.js-note-content-entry').val()
      };

      if (noteObj.id) {
        api.update(store.currentNote.id, noteObj, updateResponse => {
          store.currentNote = updateResponse;

          api.search(store.currentSearchTerm, searchResponse => {
            store.notes = searchResponse;
            render();
          });
        });
      } else {
        api.create(noteObj, createResponse => {
          store.currentNote = createResponse;

          api.search(store.currentSearchTerm, searchResponse => {
            store.notes = searchResponse;
            render();
          });
        });
      }
=======
    $('.js-note-edit-form').on('submit', function (event) {
      event.preventDefault();

      console.log('Submit Note, coming soon...');

>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    });
  }

  function handleNoteStartNewSubmit() {
    $('.js-start-new-note-form').on('submit', event => {
      event.preventDefault();

<<<<<<< HEAD
      store.currentNote = {};
      render();
=======
      console.log('Start New Note, coming soon...');

>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    });
  }

  function handleNoteDeleteClick() {
    $('.js-notes-list').on('click', '.js-note-delete-button', event => {
      event.preventDefault();

<<<<<<< HEAD
      const noteId = getNoteIdFromElement(event.currentTarget);

      api.remove(noteId, () => {
        api.search(store.currentSearchTerm, searchResponse => {
          store.notes = searchResponse;
          if (noteId === store.currentNote.id) {
            store.currentNote = {};
          }
          render();
        });
      });
=======
      console.log('Delete Note, coming soon...');
      
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
    });
  }

  function bindEventListeners() {
    handleNoteItemClick();
    handleNoteSearchSubmit();

    handleNoteFormSubmit();
    handleNoteStartNewSubmit();
    handleNoteDeleteClick();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
<<<<<<< HEAD
    bindEventListeners: bindEventListeners
  };
})();
=======
    bindEventListeners: bindEventListeners,
  };

}());
>>>>>>> 2c122d698993a249e75ab9d8ae533fc969a3b982
