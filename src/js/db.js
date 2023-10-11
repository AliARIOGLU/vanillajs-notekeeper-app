"use strict";

/* imports */

import { findNote, generateID } from "./utils.js";

// DB Object

let notekeeperDB = {};

/*
    Initializes a local database. If the dat exists in local storage, it is loaded
    otherwise a new empty database structure is created and stored.
*/

const initDB = function () {
  const db = localStorage.getItem("notekeeperDB");

  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

/*
    Reads and loads the localStorage data in to the global variable `notekeeperDB`
*/

const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

/*
   Writes the current state of the global variable `notekeeperDB` to local storage
*/

const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

/*
    Collection of functions for performing CRUD operations on database.
    The database state is managed using global variables and local storage.
*/

export const db = {
  post: {
    notebook(name) {
      readDB();

      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };

      notekeeperDB?.notebooks.push(notebookData);

      writeDB();

      return notebookData;
    },

    // adds a new note to a specified notebook in the database
    note(notebookId, obj) {
      readDB();

      let noteData = {};

      notekeeperDB.notebooks = notekeeperDB.notebooks.map((notebook) => {
        noteData = {
          id: generateID(),
          notebookId,
          ...obj,
          postedOn: new Date().getTime(),
        };
        if (notebook.id === notebookId) {
          return { ...notebook, notes: [noteData, ...notebook.notes] };
        } else {
          return notebook;
        }
      });

      writeDB();

      return noteData;
    },
  },

  get: {
    notebook() {
      readDB();

      return notekeeperDB.notebooks;
    },

    note(notebookId) {
      readDB();

      const notebook = notekeeperDB.notebooks.find(
        (notebook) => notebook.id === notebookId
      );
      return notebook.notes;
    },
  },

  update: {
    /*
     Updates the name of a notebook in the database
    */
    notebook(notebookId, name) {
      readDB();

      notekeeperDB.notebooks = notekeeperDB.notebooks.map((notebook) =>
        notebook.id === notebookId ? { ...notebook, name } : notebook
      );

      writeDB();

      return notekeeperDB.notebooks.find((nb) => nb.id === notebookId);
    },

    /*
        Updates the content of a note in the database
    */

    note(noteId, obj) {
      readDB();

      const oldNote = findNote(notekeeperDB, noteId);
      const newNote = Object.assign(oldNote, obj);

      writeDB();

      return newNote;
    },
  },

  delete: {
    /* Deletes a notebook from the database */

    notebook(notebookId) {
      readDB();

      notekeeperDB.notebooks = notekeeperDB.notebooks.filter(
        (notebook) => notebook.id !== notebookId
      );

      writeDB();
    },

    note(notebookId, noteId) {
      readDB();

      notekeeperDB.notebooks = notekeeperDB.notebooks.map((notebook) =>
        notebook.id === notebookId
          ? {
              ...notebook,
              notes: notebook.notes.filter((note) => note.id !== noteId),
            }
          : notebook
      );

      writeDB();

      return notekeeperDB.notebooks.find(
        (notebook) => notebook.id === notebookId
      ).notes;
    },
  },
};
