let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];



const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// function openModal(date) {
//   clicked = date;

//   const eventForDay = events.find(e => e.date === clicked);

//   if (eventForDay) {
//     document.getElementById('eventText').innerText = eventForDay.title;
//     deleteEventModal.style.display = 'block';
//   } else {
//     newEventModal.style.display = 'block';
//   }

//   backDrop.style.display = 'block';
// }

function load() {
  const dt = new Date();
  window.localStorage.clear();
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      // if (eventForDay) {
      //   const eventDiv = document.createElement('div');
      //   eventDiv.classList.add('event');
      //   eventDiv.innerText = eventForDay.title;
      //   daySquare.appendChild(eventDiv);
      // }

      daySquare.addEventListener('click', () =>{ 
        saveEvent(dayString)
        daySquare.style.backgroundColor = "#bcbcbc"
      });
      daySquare.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
        deleteEvent()
        daySquare.style.backgroundColor = "#FFFFFF"
      });
      
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

// function closeModal() {
//   eventTitleInput.classList.remove('error');
//   newEventModal.style.display = 'none';
//   deleteEventModal.style.display = 'none';
//   backDrop.style.display = 'none';
//   eventTitleInput.value = '';
//   clicked = null;
//   load();
// }

function saveEvent(date) {
  if (true) {
    eventTitleInput.classList.remove('error');
    clicked = date
    events.push({
      date: clicked,
      
    });
    
    localStorage.setItem('events', JSON.stringify(events));
    // closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  // closeModal();
}

function initButtons() {

  document.getElementById('logout').addEventListener('click',() =>{
    let data = new FormData();
    data.append('data', '');
    data.append('type', 'logout');
    fetch('/calendar', {

      method: 'POST',
      body: data,

    });

  });

  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  // document.getElementById('saveButton').addEventListener('click', saveEvent);
  // document.getElementById('cancelButton').addEventListener('click', closeModal);
  // document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  // document.getElementById('closeButton').addEventListener('click', closeModal);

  document.getElementById('vac').addEventListener('click',()=> {
    let data = new FormData();
    let userdata = localStorage.getItem('events');
    console.log(userdata);
    data.append('data', userdata);
    data.append('type', 'vacation');
    localStorage.removeItem('events');
    window.localStorage.clear();
    console.log(data.getAll('data'));
    console.log('local ' + localStorage.getItem('events'))
    fetch('/calendar', {

      method: 'POST',
      body: data

    });
    
    data.delete('data');
    data.delete('type');
    console.log(data.getAll('data'));
    load();
  });

  document.getElementById('work').addEventListener('click',()=> {
    let data = new FormData();
    data.append('data', localStorage.getItem('events'));
    data.append('type', 'work');
    
    localStorage.clear();
    fetch('/calendar', {

      method: 'POST',
      body: data

    });
    
    data.delete('data');
    data.delete('type');
    load();
  });

  document.getElementById('krank').addEventListener('click',()=> {

    let data = new FormData();
    data.append('data', localStorage.getItem('events'));
    data.append('type', 'krank');
    localStorage.clear();
    fetch('/calendar', {

      method: 'POST',
      body: data

    });
    data.delete('data');
    data.delete('type');
    load();
  });

}
load();
initButtons();