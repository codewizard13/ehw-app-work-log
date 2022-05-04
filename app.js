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

  // Create LI element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item list-group-item mt-3' // for materialize
  // Create text node and append to LI
  li.appendChild(document.createTextNode(inputSubject.value))
  // Create a new link element for DELETE x icon
  const delLink = document.createElement('a')
  // Add class
  delLink.className = 'delete-item secondary-content ' // materialize classes
  // Add icon HTML
  delLink.innerHTML = '<i class="fa fa-remove justify-self-end"></i>' // requires FontAwesome
  // Append delete link to li
  li.appendChild(delLink)

  // APPEND LI TO UL
  resultsList.appendChild(li)

  e.preventDefault()
}