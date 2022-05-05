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
  // Add classes to LI
  li.className = 'collection-item list-group-item mt-3 d-flex justify-content-between' // for materialize

  // Create Subject div
  const subj_div = document.createElement('div')
  // Add Classes
  subj_div.className = ''
  // Create subj text node and append
  subj_div.appendChild(document.createTextNode(inputSubject.value))

  // Create Delete link
  const delLink = document.createElement('a')
  // Add class
  delLink.className = 'delete-item secondary-content' // materialize classes
  // Add icon HTML
  delLink.innerHTML = '<i class="fa fa-remove"></i>' // requires FontAwesome
  
  /* TESTING BOOSTRAP CARD LITERAL */
  const test_card_html = `
  <div class="card" style="width: 90%;">
  <img class="card-img-top" src="img/test.jpg" alt="Card image cap" style="">
  <div class="card-body">
    <h5 class="card-title">${inputSubject.value}</h5>
    <p class="card-text">${inputDetails.value}</a>
  </div>
  </div>`

  const testCrd = document.createElement('div')
  testCrd.innerHTML = test_card_html
  console.log(testCrd)


  // Append CHILD ELEMENTS to LI
  li.appendChild(subj_div)
  li.appendChild(testCrd)

  li.appendChild(delLink)

  // APPEND LI TO UL
  resultsList.appendChild(li)


  // CLEAR INPUT after submit
  inputSubject.value = ''
  inputDetails.value = ''

  e.preventDefault()
}