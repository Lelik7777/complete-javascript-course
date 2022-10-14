'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const $form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const $inputType = document.querySelector('.form__input--type');
const $inputDistance = document.querySelector('.form__input--distance');
const $inputDuration = document.querySelector('.form__input--duration');
const $inputCadence = document.querySelector('.form__input--cadence');
const $inputElevation = document.querySelector('.form__input--elevation');

//get local position from google map
// я скопировал ссылку гугл мэп и вставил в нее свои данные из геолокации
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const {latitude, longitude} = position.coords;
        const coords=[latitude,longitude];
        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        console.log(`https://www.google.pl/maps/@${latitude},${longitude},6z`)
    }, function () {
        console.log('could not get your position')
    })
}

console.log(globalVar)
