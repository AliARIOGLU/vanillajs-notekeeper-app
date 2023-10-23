"use strict";

/* using for Sidebar toggle buttons */

const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

/* Generates a greeting message based on the current hour of the day */

const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";

  return `Good ${greeting}`;
};

/*
Activates a navigation item by adding the 'active' class and deactives the prev. active item.
*/

let lastActiveNavItem;

const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active"); // this: navItem
  lastActiveNavItem = this; // this: navItem
};

/*
  Makes a DOM element editable by setting the 'contenteditable' attr. to a true and focusing on it.
*/

const makeElemEditable = function (element) {
  element.setAttribute("contenteditable", true);
  element.focus();
};

const generateID = function () {
  return new Date().getTime().toString();
};

/* Converst ms to human readeble time */
const getRelativeTime = function (milliseconds) {
  const currentTime = new Date().getTime();

  const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day} day ago`;
};

const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }

  return note;
};

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateID,
  getRelativeTime,
  findNote,
};
