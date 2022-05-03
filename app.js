// app.js

// Define Elements
const results = document.getElementById('results')
const entryForm = document.getElementById('entry-form')
const loader = document.getElementById('loading')

// Get elements
const card = document.querySelector('.card')
const heading = document.querySelector('.heading')

// UI Input Variables
const UI_subject = document.getElementById('subject')
const UI_details = document.getElementById('details')

// Date Time functions
function getCurrentDateTime() {
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)+ "/"
      + currentdate.getFullYear() + "@"
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
  return datetime;
}


// Listen for submit
entryForm.addEventListener('submit', function (e) {
  // Hide results
  results.style.display = 'none'

  // Show loader
  loader.style.display = 'none'

  // Show results after 2 seconds
  showResults()


  e.preventDefault()

})



// Show Results
function showResults() {
  console.log('Results will show ...')

  // Validate
  if (UI_subject.value === "" || UI_details.value === "") {
    let error_text = 'Both fields must have a value'
    console.log(error_text)
    showError(error_text)
  } else {
    
  // Show loader
  loader.style.display = 'block'
    setTimeout(processEntry, 2000)
  }
}

// Show Error
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div')

  // Add Class
  errorDiv.className = 'alert alert-danger'

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  // Insert error above heading
  card.insertBefore(errorDiv, heading)

  // Clear error after 3 secs
  setTimeout(clearError, 3000)
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove()
}

// Process Entry
function processEntry() {

  // Hide loader
  loader.style.display = 'none'
  // Show results
  results.style.display = 'block'

  console.log(`Subject: ${subject.value}`)
  console.log(`Details: ${details.value}`)

}