// app.js

// Define Elements
const el_results = document.getElementById('results')
const el_entryForm = document.getElementById('entry-form')

// UI Input Variables
const UI_subject = document.getElementById('subject')
const UI_details = document.getElementById('details')


// Listen for submit
el_entryForm.addEventListener('submit', showResults)



// Show Results
function showResults(e) {
  console.log('Results will show ...')

  // Validate
  if (UI_subject.value === "" || UI_details.value === "") {
    let error_text = 'Both fields must have a value' 
    console.log(error_text)
    showError(error_text)
  } else {
    processEntry()
  }

  e.preventDefault()
}

// Show Error
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div')
  
  // Get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

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
  console.log(`Subject: ${subject.value}`)
  console.log(`Details: ${details.value}`)
}