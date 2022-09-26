'use strict';
console.log('%cfunctions', 'font-size:20px;color:green;text-decoration:underline');
//default function parameters
//параметры по умолчанию могут быть не только литералами,но и выражениями, причем может использоваться предыдущий параметр
const sum = (a, b = 2, c = 4) => {
    return a + b + c;
}
console.log(sum(3));
const booking = [];

function createBooking(flightNum, numPassengers = 1, price = 200 * numPassengers) {
    //ES5
    //numPassengers??=3;
    const bookingLoc = {flightNum, numPassengers, price};
    booking.push(bookingLoc);

}

createBooking('LH323');
//по сути,поскольку третий параметр - это выражение,то нам его можно вообще не указывать
createBooking('LH433', 3);
//чтобы пропустить параметр по умолчанию,то ему можно назначить значение undefined
createBooking('LH33', undefined, 400);
console.log(booking);


//higher order functions
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}
// function has property 'name' fn.name()
console.log(oneWord.name);
console.log(oneWord('hello world'));
const upperFirstWord = (str) => {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}
console.log(upperFirstWord('hello world'));
console.log('___________')
const transformer = (str, fn) => {
    console.log(`original string :' ${str} '`);
    console.log(`function name is ${fn.name}`);
    return fn(str);
}
console.log(transformer('js is the best!', upperFirstWord));
console.log('__________')
console.log(transformer('js is the best !', oneWord));

//
const greet = greeting => name => console.log(`${greeting}, ${name}`);
greet('hi')('bob');


