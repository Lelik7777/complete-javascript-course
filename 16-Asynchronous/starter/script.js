'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
console.log('asynchronous');
const url = country => `https://restcountries.com/v3.1/name/${country}`;
const renderCountry = (data, className = '') => {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    //add this into block finally
    //countriesContainer.style.opacity = 1;
}
const urlCode = (code) => `https://restcountries.com/v3.1/alpha/${code}`
const renderErr = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    //add this into block finally
    // countriesContainer.style.opacity=1;
}

//using new XMLHttpRequest()
const getCountry = (country) => {

    const request = new XMLHttpRequest();
    request.open('GET', url(country));
    request.send();
    request.addEventListener('load', function () {
        console.log(JSON.parse(this.responseText))
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        // console.log(Object.values(data.languages)[0])
        // console.log(Object.values(data.currencies)[0].name)
        renderCountry(data);
    });
}
//getCountry('usa');
//getCountry('france');

////////////////////////////////////
const getJSON = (url,msg='Country no found') => {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(`${msg} (${res.status})`);
        return res.json();
    });
}
//using promise and fetch API
// function getCountryByPromise(country) {
//     //get country 1
//     fetch(url(country))
//         .then(res => {
//             if(!res.ok) throw new Error(`Country no found (${res.status})`);
//             return res.json();
//         })
//         .then(data => {
//             console.log(Object.values(data[0].name)[0])
//             renderCountry(data[0]);
//             console.log(data[0])
//             const neighbour = data[0]?.borders[0];
//             //get country 2
//             return fetch(urlCode(neighbour));
//         })
//         .then(res => res.json())
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             renderErr(`Something went wrong: ${err.message}. Try again`);
//             console.log(err)
//         })
//         //add to block finally switch opacity!!
//         .finally(() => countriesContainer.style.opacity = 1);
// }

//modify getCountryByPromise  by using function getJSON
function getCountryByPromise(country) {
    //get country 1

    getJSON(url(country)).then(data => {
       // console.log(Object.values(data[0].name)[0])
        renderCountry(data[0]);
        if(!data[0].borders) throw new Error('no neighbour found');
        const neighbour = data[0].borders[0];
        console.log(data[0])

        //const neighbour='asfd'
        //get country 2
        return getJSON(urlCode(neighbour))
    }).then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            renderErr(`Something went wrong: ${err.message}. Try again`);
            console.log(err)
        })
        //add to block finally switch opacity!!
        .finally(() => countriesContainer.style.opacity = 1);
}

//add button
btn.addEventListener('click', function () {
    getCountryByPromise('usa');
})
getCountryByPromise('australia');


