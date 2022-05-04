// app.js

// DEFINE UI VARS
const topHeader = document.querySelector('h1:first-of-type')
const form = document.getElementById('entry-form')
const inputSubject = document.getElementById('subject')
const inputDetails = document.getElementById('details')
const submitBtn = document.getElementById('submit-note')

// RESULTS UI VARS
const filter = document.getElementById('filter')
const resultsList = document.querySelector('.collection')

// Load all event listeners
loadEventListeners()

/** Load event listeners */
function loadEventListeners() {
  // Add log entry event
  form.addEventListener('submit', addEntry)
}

/** Add Entry */
function addEntry(e) {
  alert('Add an Entry')

  // Create LI element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item' // for materialize
  // Create text node and append to LI
  li.appendChild(document.createTextNode(inputSubject.value))
  // Create a new link element for DELETE x icon
  const delLink = document.createElement('a')
  // Add class
  delLink.className = 'delete-item'


  e.preventDefault()
}