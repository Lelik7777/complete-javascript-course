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

// get global variables
//let map, eventMap;

//create architecture by making class App
class App {
    #map;
    #eventMap;

    constructor() {
        this.#getPosition();
        $form.addEventListener('submit', this.#newWorkout.bind(this));
//realize toggle in input type
        $inputType.addEventListener('change',this.#toggleElevationField);
    }

    #getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), function () {
                console.log('could not get your position');
            })
        }
    }

    #loadMap(position) {
        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];
        // using library  leaflet
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

//вешаю на map обработчкие события из коробки leaflet
        this.#map.on('click', this.#showForm.bind(this))
    }

    #showForm(eventM) {
        this.#eventMap = eventM;

        //whenever click on map, appear form on left
        $form.classList.remove('hidden');
        //фокус сразу же на input distance
        $inputDistance.focus();
    }

    #toggleElevationField() {

        $inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        $inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    #newWorkout(e) {
        e.preventDefault();
        //clear inputs
        $inputCadence.value = $inputDuration.value = $inputDistance.value = $inputElevation.value = '';
        // отрисовка маркера
        const {lat, lng} = this.#eventMap.latlng;
        L.marker([lat, lng], {
            opacity: 0.9,
        }).addTo(this.#map)
            // меняю поведение маркера при клике на карте
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            }))
            .setPopupContent('workout')
            .openPopup();
    }

}

const app = new App();

//get local position from google map
// я скопировал ссылку гугл мэп и вставил в нее свои данные из геолокации


//form submit

//get data from other script  - я его создал специально,чтобы посмотреть доступ к глобальным переменным
console.log(globalVar);

