const inputContainer = document.getElementById('input-container');
const datePicker = document.getElementById('date-picker');
const title = document.getElementById('title');
const countdownForm = document.querySelector('form');

//countdown section
const countDownContainer = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

//new countdown
const newCountdownBtn = document.getElementById('new-countdown');

//Set Min date on datepicker
let minDate = new Date();
minDate = minDate.toISOString().split('T')[0];
datePicker.setAttribute('min', minDate);

let selectedDate = '';
let countdownDateValue = Date;
let countdownTimeTitle = '';
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateTime() {
    countdownActive = setInterval( () => {
        let today = new Date();
        let diff = countdownDateValue - today.getTime();
        const days = Math.floor(diff / day);
        const hours = Math.floor((diff % day) / hour);
        const minutes = Math.floor((diff % hour) / minute);
        const seconds = Math.floor((diff % minute) / second);
    
        timeElements[0].textContent = days;
        timeElements[1].textContent = hours;
        timeElements[2].textContent = minutes;
        timeElements[3].textContent = seconds;    
    
        countdownTitle.textContent = countdownTimeTitle;
        inputContainer.hidden = true;
        countDownContainer.hidden = false;
    }, second);
    }


function onFormSubmit(e) {
    e.preventDefault();
    if(e.target[1].value === '') {
        alert('Please select a date for the countdown!');
    } else {
        selectedDate  = e.target[1].value;
        countdownTimeTitle = e.target[0].value;
        savedCountdown = {
            title: countdownTimeTitle,
            date: selectedDate
        };
        countdownDateValue = new Date(selectedDate).getTime();
        updateTime();
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    }
}

function checkLocalStorage() {
    if(localStorage.getItem('countdown')) {
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        selectedDate = savedCountdown.date;
        countdownTimeTitle = savedCountdown.title;
        inputContainer.hidden = true;
        countdownDateValue = new Date(selectedDate).getTime();
        updateTime();
        countDownContainer.hidden = false;
    }
}

function reset() {
    inputContainer.hidden = false;
    countDownContainer.hidden = true;
    clearInterval(countdownActive);
    selectedDate = '';
    countdownTimeTitle = '';
    localStorage.removeItem('countdown');
    title.value = '';
    datePicker.value = '';
}

//Event listeners
countdownForm.addEventListener('submit', onFormSubmit);
countdownBtn.addEventListener('click', reset);
newCountdownBtn.addEventListener('click', reset);
//on Load check
checkLocalStorage();