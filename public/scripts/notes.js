/* global $ store api */
'use strict'

const notes = (function() {
  function render() {
    const notesList = generateNotesList(store.notes, store.currentNote)
    $('.js-notes-list').html(notesList)

    const editForm = $('.js-note-edit-form')
    editForm.const DELAY = 100;
    const { promisify } = require('util');
    
    const simDB = {
    
      // Synchronous Initialize
      initialize: function (data) {
        this.nextVal = 1000;
        this.data = data.map(item => {
          item.id = this.nextVal++;
          return item;
        });
        return this;
      },
    
      // Asynchronous CRUD operations
      create: function (newItem, callback) {
        setTimeout(() => {
          try {
            newItem.id = this.nextVal++;
            this.data.push(newItem);
            callback(null, newItem);
          } catch (err) {
            callback(err);
          }
        }, DELAY);
      },
    
      filter: function (term, callback) {
        setTimeout(() => {
          try {
            let list = term ? this.data.filter(item => item.title.includes(term)) : this.data;
            callback(null, list);
          } catch (err) {
            callback(err);
          }
        }, DELAY);
      },
    
      find: function (id, callback) {
        setTimeout(() => {
          try {
            id = Number(id);
            let item = this.data.find(item => item.id === id);
            callback(null, item);
          } catch (err) {
            callback(err);
          }
        }, DELAY);
      },
    
      update: function (id, updateItem, callback) {
        setTimeout(() => {
          try {
            id = Number(id);
            let item = this.data.find(item => item.id === id);
            if (!item) {
              return callback(null, null);
            }
            Object.assign(item, updateItem);
            callback(null, item);
          } catch (err) {
            callback(err);
          }
        }, DELAY);
      },
    
      delete: function (id, callback) {
        setTimeout(() => {
          try {
            id = Number(id);
            const index = this.data.findIndex(item => item.id === id);
            if (index === -1) {
              return callback(null, null);
            } else {
              const len = this.data.splice(index, 1).length;
              return callback(null, len);
            }
          } catch (err) {
            callback(err);
          }
        }, DELAY);
      }
    
    };
    
    const simDB_Async = {
      initialize: simDB.initialize,
      create: promisify(simDB.create),
      filter: promisify(simDB.filter),
      find: promisify(simDB.find),
      update: promisify(simDB.update),
      delete: promisify(simDB.delete)
    };
    
    module.exports = Object.create(simDB_Async);
    ('.js-note-title-entry').val(store.currentNote.title)
    editForm.find('.js-note-content-entry').val(store.currentNote.content)
  }

  /**
   * GENERATE HTML FUNCTIONS
   */
  function generateNotesList(list, currentNote) {
    const listItems = list.map(
      item => `
    <li data-id="${item.id}" class="js-note-element ${
        currentNote.id === item.id ? 'active' : ''
      }">
      <a href="#" class="name js-note-show-link">${item.title}</a>
      <button class="removeBtn js-note-delete-button">X</button>
    </li>`
    )
    return listItems.join('')
  }

  /**
   * HELPERS
   */
  function getNoteIdFromElement(item) {
    const id = $(item)
      .closest('.js-note-element')
      .data('id')
    return id
  }

  /**
   * EVENT LISTENERS AND HANDLERS
   */
  function handleNoteItemClick() {
    $('.js-notes-list').on('click', '.js-note-show-link', event => {
      event.preventDefault()

      const noteId = getNoteIdFromElement(event.currentTarget)

      api.details(noteId, detailsResponse => {
        store.currentNote = detailsResponse
        render()
      })
    })
  }

  function handleNoteSearchSubmit() {
    $('.js-notes-search-form').on('submit', event => {
      event.preventDefault()

      const searchTerm = $('.js-note-search-entry').val()
      store.currentSearchTerm = searchTerm ? {searchTerm} : {}

      api.search(store.currentSearchTerm, searchResponse => {
        store.notes = searchResponse
        render()
      })
    })
  }

  function handleNoteFormSubmit() {
    $('.js-note-edit-form').on('submit', function(event) {
      event.preventDefault()

      console.log('Submit Note, coming soon...')
    })
  }

  function handleNoteStartNewSubmit() {
    $('.js-start-new-note-form').on('submit', event => {
      event.preventDefault()

      console.log('Start New Note, coming soon...')
    })
  }

  function handleNoteDeleteClick() {
    $('.js-notes-list').on('click', '.js-note-delete-button', event => {
      event.preventDefault()

      console.log('Delete Note, coming soon...')
    })
  }

  function bindEventListeners() {
    handleNoteItemClick()
    handleNoteSearchSubmit()

    handleNoteFormSubmit()
    handleNoteStartNewSubmit()
    handleNoteDeleteClick()
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners
  }
})()
