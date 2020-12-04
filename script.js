const inputContainer = document.getElementById('input-container');
const countDownContainer = document.getElementById('countdown');
const datePicker = document.getElementById('date-picker');
const title = document.getElementById('title');
const countdownForm = document.querySelector('form');
const countdownTitle = document.getElementById('countdown-title');

//Set Min date on datepicker
let minDate = new Date();
minDate = minDate.toISOString().split('T')[0];
datePicker.setAttribute('min', minDate);

function onFormSubmit(e) {
    e.preventDefault();
    console.log(e);
    if(e.target[1].value === '') {
        alert('Please select a date for the countdown!');
    } else {
        countdownTitle.textContent = e.target[0].value;
        inputContainer.hidden = true;
        countDownContainer.hidden = false;
    }
}

countdownForm.addEventListener('submit', onFormSubmit);