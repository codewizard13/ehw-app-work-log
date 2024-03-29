// app.js

// DEFINE REAL CONSTANTS
const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const sep_bar = '---------------------------------' // for console.log

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
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getEntries)
  // Add log entry event
  form.addEventListener('submit', addEntry)
  // Remove entry event
  resultsList.addEventListener('click', removeEntry)
  // Filter entries
  filter.addEventListener('keyup', filterEvents)
  // Clear all entries event
  clearAllBtn.addEventListener('click', clearEntries)

}

/** Get entries from Local Storage */
function getEntries() {
  let entries

  // Check if entries already exist
  if (localStorage.getItem('entries') === null) {
    entries = []
  } else {
    entries = JSON.parse(localStorage.getItem('entries'))
  }

  // Loop through entries in local storage
  entries.forEach(function (entry) {
    // console.log("entry from localStorage:")
    // console.log(entry.subject)
    // console.log('----------------------------')

    // Create LI element
    const li = document.createElement('li')
    // Add classes to LI
    li.className = 'collection-item' // for materialize
    // Add data item
    li.setAttribute('id', entry.id)

    // Retrieve Date & Time Values from entry object
    const subject = entry.subject
    const deets = entry.deets
    const dateISO = entry.dt.date
    const time = entry.dt.time
    const tz = entry.dt.tz


    // Create LI with Template Literal
    let li_html = `
      <div class="left-col">
        <div class="date">Date: <span>${dateISO}</span></div>
        <div class="time">Time:  <span>${time}</span></div>
        <div class="tz">Time Zone: <span>${tz}</span></div>
      </div>

      <div class="content">
        <div class="subject">${subject}</div>
        <div class="deets">${deets}</div>
      </div>

      <div class="rt-col">
        <a class="delete-item secondary-content"><i class="fa fa-remove" aria-hidden="true"></i></a>
      </div>`

    // const li = document.createElement(li)
    li.innerHTML = li_html

    // APPEND LI TO UL
    resultsList.appendChild(li)
  })
}

/** Get date and time */
function getDateTime(dt_fmt = 'US-12') {

  var out_obj = {};
  var date_obj = {};
  var time_obj = {};
  var cur_dt = new Date();

  var unix_timestamp = Date.now()

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
    yr2, mo2, dy2, date_mmddyy, date_ISO, dow_name, mo_long,
    tz_short, date_long, date_full, unix_timestamp
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
  out_obj['EN-12'].unix_timestamp = unix_timestamp
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
  const unix_timestamp = today["EN-12"].unix_timestamp
  console.log(unix_timestamp)

  // BUILD ENTRY ID:
  
  // Get (up to) first 16 digits of subject
  let sub_part = (inputSubject.value).slice(0, 16)
  console.log(sub_part)

  // Remove all spaces
  sub_part = sub_part.replace(/\s+/g, '')
  console.log(sub_part)

  // Remove all punctuation
  const regex = new RegExp('[' + punctuation + ']', 'g');
  sub_part = sub_part.replace(regex, '')

  // Lowercase sub_part
  sub_part = sub_part.toLowerCase()
  console.log(sub_part)

  const entry_id = `${unix_timestamp}_${sub_part}`
  console.log('entry_id: ' + entry_id)

  // Add ID to LI
  li.setAttribute('id', entry_id)

  // Create LI with Template Literal
  let li_html = `

  <div class="left-col">
    <div class="date">Date: <span>${now_date_ISO}</span></div>
    <div class="time">Time:  <span>${now_time_12}</span></div>
    <div class="tz">Time Zone: <span>${now_tz}</span></div>
  </div>
  
  <div class="content">
    <div class="subject">${inputSubject.value}</div>
    <div class="deets">${inputDetails.value}</div>
  </div>
  
  <div class="rt-col">
    <a class="delete-item secondary-content"><i class="fa fa-remove" aria-hidden="true"></i></a>
  </div>
  `
  // const li = document.createElement(li)
  li.innerHTML = li_html

  // APPEND LI TO UL
  resultsList.appendChild(li)

  // Add event info to object
  const entryObj = {}
  // Add ID
  entryObj.id = entry_id
  entryObj.subject = inputSubject.value
  entryObj.deets = inputDetails.value
  entryObj.dt = {}
  entryObj.dt.date = now_date_ISO
  entryObj.dt.time = now_time_12
  entryObj.dt.tz = now_tz

  // Store Events in LOCAL STORAGE
  storeEntryInLocalStorage(entryObj)

  // CLEAR INPUT after submit
  inputSubject.value = ''
  inputDetails.value = ''

  e.preventDefault()
} // END addEntry()

/** Store Event */
function storeEntryInLocalStorage(entry) {
  let entries

  // Check if entries already exist
  if (localStorage.getItem('entries') === null) {
    entries = []
  } else {
    entries = JSON.parse(localStorage.getItem('entries'))
  }

  // Push entry onto entries
  entries.push(entry)

  // Add entries array to localStorage, converting to string
  localStorage.setItem('entries', JSON.stringify(entries))

}

/** Remove entry */
function removeEntry(e) {
  // Define entry element to delete
  const li = e.target.parentElement.parentElement.parentElement

  // Use EVENT DELEGATION
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target)
    if (confirm('Are you sure you want to DELETE this entry?')) {
      li.remove()

      // Remove from Local Storage
      removeEntryFromLocalStorage(li)

    }
  }



}

/** Remove Entry from Local Storage */
function removeEntryFromLocalStorage(entryItem) {
  let entries
  console.log('entryItem: ')
  console.log(entryItem)
  // Check if entries already exist
  if (localStorage.getItem('entries') === null) {
    entries = []
  } else {
    entries = JSON.parse(localStorage.getItem('entries'))
  }


  // console.log('entries')
  // console.log(entries)
  // console.log('-------------------------')

  // Loop through each entry
  entries.forEach(function (entry, index) {
    console.log('entry.id: ')
    console.log(entry.id)
    console.log('entryItem.id: ')
    console.log(entryItem.id)
    // console.log(JSON.stringify(entryItem.textContent))
    console.log('-------------------------')
    if (entryItem.id === entry.id) {
      console.log('SAME')
      entries.splice(index, 1)
    } else {
      console.log('DIFFERENT')
    }
  })

  // Set localStorage again
  localStorage.setItem('entries', JSON.stringify(entries))
}

/** Clear All Entries */
function clearEntries(e) {
  // While there still is a first child means 'at least one item' means 'not empty'
  while (resultsList.firstChild) {
    resultsList.removeChild(resultsList.firstChild)
  }
}

/** Filter Events */
function filterEvents(e) {
  const needle = e.target.value.toLowerCase()

  // Loop through all entries
  document.querySelectorAll('.collection-item').forEach(
    function (entry) {
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
