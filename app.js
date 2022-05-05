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

/** Add Entry Card*/
function addEntry(e) {

  // Create LI element
  const li = document.createElement('li')
  // Add classes to LI
  // li.className = 'collection-item card list-group-item mt-3 d-flex justify-content-between' // for materialize
/*

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

  // Entry Card template literal
  let test_card_html = `
  <div>
    <h5 class="card-title text-left">${inputSubject.value}</h5>
    <p class="card-text text-left">${inputDetails.value}</a>
  </div>
  <a class="delete-item secondary-content"><i class="fa fa-remove" aria-hidden="true"></i></a>
  `


  const testCrd = document.createElement('div')
  testCrd.className = 'card-body'
  testCrd.innerHTML = test_card_html
  console.log(testCrd)
  // testCrd.appendChild(delLink)


  // Append CHILD ELEMENTS to LI
  // li.appendChild(subj_div)
  li.appendChild(testCrd)

  // li.appendChild(delLink)
  */

  // Create LI with Template Literal
  let li_html = `

  <div class="left-col">
    <div class="date">Date: 2022-05-05</div>
    <div class="time">Time:  7:18 AM</div>
    <div class="tz">Time Zone: CDT</div>
  </div>
  
  <div class="content">
    <div class="subject">${inputSubject.value}</div>
    <div class="deets">

      ${inputDetails.value}

    </div>
  </div>
  
  <div class="rt-col">
    <a class="delete-item secondary-content"><i class="fa fa-remove" aria-hidden="true"></i></a>
  </div>

  `
  console.log(li)

  // const li = document.createElement(li)
  li.innerHTML = li_html

  // // APPEND LI TO UL
  resultsList.appendChild(li)


  // CLEAR INPUT after submit
  inputSubject.value = ''
  inputDetails.value = ''

  e.preventDefault()
}