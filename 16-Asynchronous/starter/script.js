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
const getJSON = (url, msg = 'Country no found') => {
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
        if (!data[0].borders) throw new Error('no neighbour found');
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
// btn.addEventListener('click', function () {
//     getCountryByPromise('usa');
// })
//getCountryByPromise('australia');

//challenge #1
//TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474
function whereAmI(lat, lng) {

    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => {
        if (!res.ok) throw new Error(`something went wrong (${res.status})`);
        return res.json();
    })
        .then(data => {
            console.log(`You are in ${data.city},${data.country}`);
            if (!data.country) throw Error(`country not found`);
            getCountryByPromise(data.country);
        })
        .catch(err => {
            console.error(err.message)
        })
}

console.log(whereAmI.name);
//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);


//Building a simple promise
const lottery = new Promise((resolve, reject) => {
    if (Math.random() >= .5) resolve('you are win');
    else reject(new Error('you lose'));
});
lottery.then(res => console.log(res)).catch(er => console.log(er));

//промисификация
const regularFun = () => {
    console.log('regular function');
}
//эта функция имеет дело с какой-то ассинхронщиной
const wait = function (sec) {
    return new Promise(res => setTimeout(res, sec * 1000, sec));
}
const showRes = (res) => {
    console.log(`wait ${res} seconds`);
}
wait(2)
    .then((res) => {
        showRes(res);
        return wait(3);
    })
    .then(res => showRes(res));
regularFun();

//
const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}


//промисификация whereAmI
function whereAmIPromise() {
    getPosition().then(res => {
        const {latitude: lat, longitude: lng} = res.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
        .then(res => {
            if (!res.ok) throw new Error(`something went wrong (${res.status})`);
            return res.json();
        })
        .then(data => {
            console.log(`You are in ${data.city},${data.country}`);
            if (!data.city) throw Error(`country not found`);
            getCountryByPromise(data.country);
        })
        .catch(err => {
            console.error(err.message)
        })
}

btn.addEventListener('click', whereAmIPromise);


//challenge #2
const $images = document.querySelector('.images');

const createImage = (imgPath) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.addEventListener('load', function () {
            $images.insertAdjacentElement('afterbegin', this);
            resolve(img);
        });
        img.addEventListener('error', function () {
            reject(new Error(`Something went wrong: img scr=${img.src}`))
        })
    });
}
let imgG;
// createImage('img/img-1.jpg')
//     .then(img => {
//         imgG = img;
//         return wait(3);
//     })
//     .then(() => {
//         imgG.style.display = 'none';
//         return createImage('https://images.unsplash.com/photo-1666720192309-b6f2a1794444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60');
//     })
//     .then(img => {
//         imgG = img;
//         return wait(3);
//     })
//     .then(() => {
//         imgG.style.display = 'none';
//         return createImage('https://images.unsplash.com/photo-1666849077010-d7e979d6b38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60');
//     }).catch(err => alert(err.message));
// wait(1)
//     .then(()=>{
//        return  createImage('https://images.unsplash.com/photo-1666845524565-11c4f0f99f22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60')
//     })
//     .then(img=>{
//         img.style.display='none';
//         return createImage('https://images.unsplash.com/photo-1666720192309-b6f2a1794444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60')
//     })


// async await
//transform function whereAmIPromise
async function whereAmIAsync() {
    try {
        const resGeo = await getPosition();
        const {latitude: lat, longitude: lng} = resGeo.coords;
        const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!res.ok) throw new Error(`something went wrong (${res.status})`);
        const data = await res.json();
        console.log(`You are in ${data.city},${data.country}`);
        if (!data.country) throw Error(`country not found`);
        getCountryByPromise(data.country);
        return `you are in ${data.country},${data.city}`;
    } catch (e) {
        console.log(e.message);
        renderErr(`something went wrong ${e.message}`);
        //чтобы сработал блок catch снаружи
        throw e;
    } finally {
        countriesContainer.style.opacity = 1;
    }

}

//whereAmIAsync();
//чтобы обработать то,что возвращает асинхронная ф-ция, нам нужно использовать метод then and catch,поскольку async function always return promise
//whereAmIAsync().then(res => console.log(res)).catch(err => console.error(err.message));
//тоже самое можно сделать через async function
(async function () {
    try {
        const res = await whereAmIAsync();
        console.log(res);
    } catch (e) {
        console.error(e.message);
    }

})();

const getCapitals = async (c1, c2, c3) => {
    try {
        //разные запросы одновременно
        // const [data1] = await getJSON(url(c1));
        // const [data2] = await getJSON(url(c2));
        // const [data3] = await getJSON(url(c3));
        // console.log([data1.capital, data2.capital, data3.capital].flat());
        const data = await Promise.all([getJSON(url(c1)), getJSON(url(c2)), getJSON(url(c3))]);
        console.log(data.flat().map(d => d.capital).flat());
    } catch (e) {
        console.error(e.message);
    }
}
//getCapitals('usa', 'tanzania', 'canada');

//using Promise.race() for abort long running request
//если запрос слишком долгий, то сработает timeout,в котором мы устанавливаем нужную нам задержку запроса по времени
function timeout(sec) {
    return new Promise((_, reject) => {
        setTimeout(function () {
            reject(new Error('too long request'));
        }, sec * 1000);
    });
}

const usa = url('usa');
Promise.race([getJSON(usa), timeout(.5)])
    .then(res => console.log(res))
    .catch(err => console.error(err.message));
//getJSON(url('usa')).then(res => console.log(res));

// Promise.any
Promise.any([
    Promise.reject('Error'),
    Promise.reject('Error2'),
    Promise.resolve('Success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err.message));


//#challenge #3
//part1
const img1 = 'img/img-1.jpg';
const img2 = 'img/img-2.jpg';
const img3 = 'img/img-3.jpg';


const loadPause = async (...imgs) => {
    try {
        for (let i = 0, time = 3; i < imgs.length; i++) {
            console.log(imgs[i]);
            const image = await createImage(imgs[i]);
            await wait(time);
            if (image)
                image.style.display = 'none';
        }

    } catch (e) {
        alert(e.message);
    } finally {

    }
}

//loadPause(img1, img2);
//part 2
const arrImgs = [img1, img2, img3];
const loadAll = async (arr) => {
    const imgs = arr.map( async el => await createImage(el));
    console.log(imgs);
    const res = await Promise.all(imgs);
    //const res= await Promise.race(imgs);
    console.log(res)
    res.forEach(r => r.classList.add('parallel'))
}
wait(0)
    .then(() => {
        loadPause(img1, img2);
        return wait(1);
    })
    .then(() => loadAll(arrImgs));