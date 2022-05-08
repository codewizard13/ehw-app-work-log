// app.js

// DEFINE UI VARS
const topHeader = document.querySelector('h1:first-of-type')
const form = document.getElementById('entry-form')
const clearAllBtn = document.getElementById('clear-tasks')
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
  // Remove entry event
  resultsList.addEventListener('click', removeEntry)
  // Filter entries
  filter.addEventListener('keyup', filterEvents)
  // Clear all entries event
  clearAllBtn.addEventListener('click', clearEntries)

}

/** Get date and time */
function getDateTime(dt_fmt = 'US-12') {

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
  var dow_name = Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(cur_dt);
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
  var mins_pad_0 = mins.toString().padStart(2, 0);
  var fmt_12hr = `${hrs}:${mins} ${AmOrPm}`;
  var fmt_12hr_pad0 = `${hrs_pad_0}:${mins_pad_0} ${AmOrPm}`;
  var fmt_12hr_padSp = `${hrs_pad_sp}:${mins_pad_0} ${AmOrPm}`;

  // Time Object
  time_obj = {
    hrs, AmOrPm, mins_pad_0, fmt_12hr, fmt_12hr_pad0, fmt_12hr_padSp
  }

  // Add properties to out object
  out_obj.dt = cur_dt;
  out_obj['EN-12'] = {};
  out_obj['EN-12'].date = date_obj;
  out_obj['EN-12'].time = time_obj;

  return out_obj;
}

/** Add Entry Card*/
function addEntry(e) {

  // Create LI element
  const li = document.createElement('li')
  // Add classes to LI
  li.className = 'collection-item' // for materialize

  // Add time and date
  const today = getDateTime();

  // Build Date & Time Values
  const now_date_long = today["EN-12"].date.date_long
  const now_dow = today["EN-12"].date.dow_name
  const now_date_ISO = today["EN-12"].date.date_ISO
  const now_time_12 = today["EN-12"].time.fmt_12hr_padSp
  const now_tz = today["EN-12"].date.tz_short

  // console.log(now_date_long)
  // console.log(now_dow)
  // console.log(now_date_ISO)
  console.log(now_time_12)
  // console.log(now_tz)



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
    <div class="date">Date: <span>${now_date_ISO}</span></div>
    <div class="time">Time:  <span>${now_time_12}</span></div>
    <div class="tz">Time Zone: <span>${now_tz}</span></div>
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
  // console.log(li)

  // const li = document.createElement(li)
  li.innerHTML = li_html

  // // APPEND LI TO UL
  resultsList.appendChild(li)


  // CLEAR INPUT after submit
  inputSubject.value = ''
  inputDetails.value = ''

  e.preventDefault()
}

/** Remove entry */
function removeEntry(e){
  // Use EVENT DELEGATION
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target)
    if (confirm('Are you sure you want to DELETE this entry?')) {
      e.target.parentElement.parentElement.parentElement.remove()
    }
  }

}

/** Clear All Entries */
function clearEntries(e) {
  
}

/** Filter Events */
function filterEvents (e) {
  const needle = e.target.value.toLowerCase()

  // Loop through all entries
  document.querySelectorAll('.collection-item').forEach(
    function(entry) {
      const item = entry.innerText
      console.log("item:")
      console.log(item)
      console.log('----------------------------')

      if (item.toLowerCase().indexOf(needle) != -1) {
        entry.style.display = 'flex'
      } else {
        entry.style.display = 'none'
      }
  })

  console.log('needle:')
  console.log(needle)
}




