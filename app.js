// app.js

// DEFINE ELEMENTS

// Entry Form Elements
const card = document.querySelector('.card')
const headingFirst = document.querySelector('.heading:first-of-type')
const entryForm = document.getElementById('entry-form')

// UI Input Variables
const UI_subject = document.getElementById('subject')
const UI_details = document.getElementById('details')

// Results Elements
const loader = document.getElementById('loading')
const results = document.getElementById('results')
const dateLong = document.querySelector('.date-long')
const dateDOWLong = document.querySelector('.date-dow-long')
const subject = document.querySelector('.subject')
const details = document.querySelector('.details')

// .date-long,
// .date-dow-long {
//   color: green;
// }

// #current-entry-date,
// #current-entry-time

// Date Time Elements
const nowDate = document.getElementById('current-entry-date')
const nowTime = document.getElementById('current-entry-time')
const nowTz = document.getElementById('current-entry-tz')



// Get date and time
function getDateTime(dt_fmt='US-12') {

  var out_obj = {};
  var date_obj = {};
  var time_obj = {};
  var cur_dt = new Date();

  // Date
  var yr2 = cur_dt.getFullYear().toString().substring(2);
  var mo2 = String(cur_dt.getMonth() + 1).padStart(2, 0);
  var dy2 = String(cur_dt.getDate()).padStart(2, 0);
  var date_mmddyy = `${mo2}/${dy2}/${yr2}`;
  var date_ISO = `${cur_dt.getFullYear()}-${mo2}-${dy2}`;
  var dow_name = Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(cur_dt);
  var mo_long = cur_dt.toLocaleString('default', { month: 'long' });

  // Timezone Abbreviation
  const tz_short = cur_dt.toLocaleDateString('en-US', {
    day: '2-digit',
    timeZoneName: 'short',
  }).slice(4)

  var date_full = `${dow_name}, ${mo_long} ${dy2}, ${cur_dt.getFullYear()}`;

  // Date Object
  date_obj = {
    yr2, mo2, dy2, date_mmddyy, date_ISO, dow_name, mo_long, tz_short, date_full
  }

  // Time
  var hrs = cur_dt.getHours(); // gets 24 hr val
  var AmOrPm = hrs >= 12 ? 'PM' : 'AM';
  
  hrs = (hrs % 12) || 12;
  var hrs_pad = hrs.toString().padStart(2, 0);

  var mins = cur_dt.getMinutes();
  var fmt_12hr = `${hrs}:${mins} ${AmOrPm}`;
  var fmt_12hr_pad = `${hrs}:${mins} ${AmOrPm}`;

  // Time Object
  time_obj = {
    hrs, AmOrPm, mins, fmt_12hr, fmt_12hr_pad
  }

  // Add properties to out object
  out_obj.dt = cur_dt;
  out_obj['EN-12'] = {};
  out_obj['EN-12'].date = date_obj;
  out_obj['EN-12'].time = time_obj;

  return out_obj;
}
const today = getDateTime();

// Build Date & Time Values
const now_date = today["EN-12"].date.date_ISO
console.log(`now_date:  ${now_date}`)


// Replace Date and Time in Current Entry
nowDate.innerText = now_date


console.log(`Today:  ${today["EN-12"].date.date_ISO}`)

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
  card.insertBefore(errorDiv, headingFirst)

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

  console.log(`Subject: ${UI_subject.value}`)
  console.log(`Details: ${UI_details.value}`)

}