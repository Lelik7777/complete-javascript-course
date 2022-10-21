'use strict';


const $form = document.querySelector('.form');
const $containerWorkouts = document.querySelector('.workouts');
const $inputType = document.querySelector('.form__input--type');
const $inputDistance = document.querySelector('.form__input--distance');
const $inputDuration = document.querySelector('.form__input--duration');
const $inputCadence = document.querySelector('.form__input--cadence');
const $inputElevation = document.querySelector('.form__input--elevation');

const iconRun = '🏃';
const iconCycle = '🚴';

//parent class for general  workouts
class Workout {
    //public fields - general for all instances
    date = new Date();
    id = (Date.now() + '').slice(-10);
    click = 0;


    constructor(coords, distance, duration,) {
        this.coords = coords;//[lat,lng]
        this.distance = distance;//in km
        this.duration = duration;//in min
    }

//этот метод испоьльзуется исключительно у потомков
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type.replace(this.type[0], this.type[0].toUpperCase())} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    setClick() {
        this.click++;
    }
}


//create child classes
class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

//km/h
    calcSpeed() {
        return this.speed = (this.distance / (this.duration / 60)).toFixed(1);
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();

    }

//min/km
    calcPace() {
        return this.pace = (this.duration / this.distance).toFixed(1);
    }
}


////////////////////////////////////////
//create class App - application
class App {
    #map;
    #mapZoomLevel = 13;
    #eventMap;
    #workouts = [];

    constructor() {
        // get position
        this.#getPosition();

        //get data to localStorage
        this.#getLocalStorage();
        // handle events
        $form.addEventListener('submit', this.#newWorkout.bind(this));
//realize toggle in input type
        $inputType.addEventListener('change', this.#toggleElevationField);
        //move to marker on map
        $containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));

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
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

//вешаю на map обработчкие события из коробки leaflet
        this.#map.on('click', this.#showForm.bind(this));

        //render popups from
        this.#workouts.forEach(work => this.#renderMarkerWorkout(work));

    }

    #showForm(eventM) {
        this.#eventMap = eventM;

        //whenever click on map, appear form on left
        $form.classList.remove('hidden');
        //фокус сразу же на input distance
        $inputDistance.focus();
    }

    #hideForm() {
        //empty inputs
        $inputCadence.value = $inputDuration.value = $inputDistance.value = $inputElevation.value = '';
        //убираю форму - это исключительно для реализации визуального приема
        $form.style.display = 'none';
        $form.classList.add('hidden');
        //через секунду она снова появляется
        setTimeout(() => ($form.style.display = 'grid'), 1000);
    }

    #toggleElevationField() {

        $inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        $inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    #newWorkout(e) {
        //valid on number
        const validNumber = (...value) => value.every(v => Number.isFinite(v));
        //valid on positive value
        const validPositive = (...value) => value.every(v => v > 0);

        e.preventDefault();

        //get data from inputs
        const type = $inputType.value;
        const distance = +$inputDistance.value;
        const duration = +$inputDuration.value;
        const cadence = +$inputCadence.value;
        const elevationGain = +$inputElevation.value;
        let workout;
        const {lat, lng} = this.#eventMap.latlng;
        // validate data as positive number
        //if type is cycle then create cycling object

        if (type == 'cycling') {
            if (!validNumber(distance, duration, elevationGain)
                || !validPositive(distance, duration)) return alert('enter positive number');
            workout = new Cycling([lat, lng], distance, duration, elevationGain);
        }
        //if type is running then creat running object
        if (type == 'running') {

            if (!validNumber(distance, duration, cadence)
                || !validPositive(distance, duration, cadence)) return alert('enter positive number');
            workout = new Running([lat, lng], distance, duration, cadence);
        }
        //add creating object to workout array
        this.#workouts.push(workout);
        //render marker workout on map
        this.#renderMarkerWorkout(workout);
        //render list of workouts
        this.#renderWorkout(workout);
        //hide form and clear inputs
        this.#hideForm();

//set workout to localStorage
        this.#setLocalStorage();
    }

    #renderMarkerWorkout(workout) {
        L.marker(workout.coords, {
            opacity: 0.9,
        }).addTo(this.#map)
            // меняю поведение маркера при клике на карте
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === 'running' ? iconRun : iconCycle} ${(workout.type)} on ${workout.description} `)
            .openPopup();
    }

    #renderWorkout(workout) {
        let html = `
<li class="workout workout--running" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? iconRun : iconCycle}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
`
        if (workout.type === 'running') {
            html += `
             <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
            `
        }
        if (workout.type === 'cycling') {
            html += `
             <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.fixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
            `
        }
        $form.insertAdjacentHTML('afterend', html);
    }

    #moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        //защита
        if (!workoutEl) return;
        //find in workout array element by id from workoutEl
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });
        //interact with using interface
        // workout.setClick();
    }

    #setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    #getLocalStorage() {
        //get data from localStorage
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;

        //set data from localStorage to array of workouts
        this.#workouts = data;
        //render workouts list in sidebar
        this.#workouts.forEach(d => this.#renderWorkout(d));
    }

    reset() {
      localStorage.removeItem('workouts');
      location.reload();
    }
}


const app = new App();
//get local position from google map
// я скопировал ссылку гугл мэп и вставил в нее свои данные из геолокации


//form submit

//get data from other script  - я его создал специально,чтобы посмотреть доступ к глобальным переменным
console.log(globalVar);

