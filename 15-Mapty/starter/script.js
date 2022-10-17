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
        const coords = [latitude, longitude];
        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        map.on('click', function (eventMap) {
            const {lat, lng} = eventMap.latlng;
            L.marker([lat, lng], {
                opacity: 0.9,
            }).addTo(map)
                .bindPopup(L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup'
                }))
                .setPopupContent('workout')
                .openPopup();
        })

    }, function () {
        console.log('could not get your position');
    })
}
//get data from another script
console.log(globalVar);
