// app.js

// DEFINE ELEMENTS

// Entry Form Elements
const card = document.querySelector('.card')
const headingFirst = document.querySelector('.heading:first-of-type')
const entryForm = document.getElementById('entry-form')

// UI Input Variables
const input_subject = document.getElementById('subject')
const input_details = document.getElementById('details')

// Results Elements
const loader = document.getElementById('loading')
const results = document.getElementById('results')

const dateLong = document.querySelector('.date-long')
const dateDOWLong = document.querySelector('.date-dow-long')

const entry_subject = document.querySelector('.subject')
const entry_details = document.querySelector('.details')

// Results Date Time Elements
const entry_nowDate = document.getElementById('current-entry-date')
const entry_nowTime = document.getElementById('current-entry-time')
const entry_nowTz = document.getElementById('current-entry-tz')



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

  var date_long = `${mo_long} ${dy2}, ${cur_dt.getFullYear()}`;
  var date_full = `${dow_name}, ${mo_long} ${dy2}, ${cur_dt.getFullYear()}`;

  // Date Object
  date_obj = {
    yr2, mo2, dy2, date_mmddyy, date_ISO, dow_name, mo_long, tz_short, date_long, date_full
  }

  // Time
  var hrs = cur_dt.getHours(); // gets 24 hr val
  var AmOrPm = hrs >= 12 ? 'PM' : 'AM';
  
  hrs = (hrs % 12) || 12;
  var hrs_pad_0 = hrs.toString().padStart(2, 0);
  var hrs_pad_sp = hrs.toString().padStart(2, " ");

  var mins = cur_dt.getMinutes();
  var fmt_12hr = `${hrs}:${mins} ${AmOrPm}`;
  var fmt_12hr_pad0 = `${hrs_pad_0}:${mins} ${AmOrPm}`;
  var fmt_12hr_padSp = `${hrs_pad_sp}:${mins} ${AmOrPm}`;

  // Time Object
  time_obj = {
    hrs, AmOrPm, mins, fmt_12hr, fmt_12hr_pad0, fmt_12hr_padSp
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
const now_date_long = today["EN-12"].date.date_long
const now_dow = today["EN-12"].date.dow_name 
const now_date_ISO = today["EN-12"].date.date_ISO
const now_time_12 = today["EN-12"].time.fmt_12hr_padSp
const now_tz = today["EN-12"].date.tz_short


// Replace Date and Time in Current Entry
// console.log(`Today:  ${today["EN-12"].date.date_ISO}`)

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
  if (input_subject.value === "" || input_details.value === "") {
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
  console.log(`Subject: ${input_subject.value}`)
  console.log(`Details: ${input_details.value}`)

  // Update results
  dateLong.innerHTML = now_date_long
  dateDOWLong.innerHTML = now_dow

  entry_nowDate.innerHTML = now_date_ISO
  entry_nowTime.innerHTML = now_time_12
  entry_nowTz.innerHTML = now_tz

  entry_subject.innerHTML = input_subject.value
  entry_details.innerHTML = input_details.value

  // Show results
  results.style.display = 'block'

}