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


// this call(), bind(),apply()

const user1 = {
    name: 'bob',
    yearnBorn: 1988,
    job: 'developer',
    getAge() {
        return new Date().getFullYear() - this.yearnBorn;
    },
    data: [],
    setData(location, hobby) {
        this.data.push({location, hobby});
    }
}
const age = user1.getAge;
const data = user1.setData;

const user2 = {
    name: 'tom',
    yearnBorn: 1978,
    job: 'admin',
    data: []
}
console.log(age.call(user1));
data.call(user1, 'simf', 'gym');
console.log(user1);
console.log(age.call(user2));
data.call(user2, ...['moscow', 'chess']);
console.log(user2);
data.apply(user1, ['simf2', 'gym2']);
console.log(user1);


//bind()
//могу частично указать аргументы, могу вообще не указывать
//const dataUser2=data.bind(user2);
//я могу создать любое количество разных ф-ций
const dataUser2Simf = data.bind(user2, 'simf');
const dataUser2Moscow = data.bind(user2, 'moscow');
dataUser2Simf('gym');
dataUser2Simf('sea');
dataUser2Moscow('chess');
//интересно,что я могу повторять и в объекте создаются одинаковые свойства
dataUser2Moscow('chess');
console.log(user2);//{location: 'moscow', hobby: 'chess'}{location: 'simf', hobby: 'gym'}{location: 'simf', hobby: 'sea'}{location: 'moscow', hobby: 'chess'}{location: 'moscow', hobby: 'chess'}

//with event listeners
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],

    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};
const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
    planes: 200,
};
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
}
const buy = lufthansa.buyPlane;
lufthansa.buyPlane();
console.log(lufthansa);
const $btnBuy = document.querySelector('.buy');
//$btnBuy.addEventListener('click',lufthansa.buyPlane.bind(lufthansa));
$btnBuy.addEventListener('click', buy.bind(lufthansa));
console.log(lufthansa);

//partial application
const addTax = (rate, value) => {
    return value + rate * value;
}
console.log(addTax(.10, 100));
//если мы хотим захардкодить какой-то параметр,то используем bind()
const addNDS = addTax.bind(null, .25);
//таким образом мы получили ф-цию с фиксированным налогом,поэтому при ее вызове мы указываем лишь значение(один аргумент)
console.log(addNDS(200));
//the arrow function
const setTax = rate => value => value + rate * value;
//the same but by function declaration
const getTax = (rate) => {
    return function (value) {
        console.log(value + value * rate);
        return value + value * rate;
    }
}
const get20percents = getTax(.2);
get20percents(100);
get20percents(300);

//challenge #1 pol application
const poll = {
    name: 'poll',
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = +prompt(`${this.question}\n${this.options.join('\n')} \n(Write option number)`);
        if (typeof answer === 'number' && answer >= 0 && answer < this.options.length) {
            this.answers[answer]++;
        } else {
            alert('you enter wrong value');
        }
        this.displayResults();
        this.displayResults('string');
    },
    displayResults(type = 'array') {
        if (type === 'array') console.log(this.answers)
        else if (typeof type === 'string') {
            console.log(`${this.name} results are ${this.answers.join(',')}`);
        }
    }
}
const $btnAnswerPoll = document.querySelector('.poll');
$btnAnswerPoll.addEventListener('click', poll.registerNewAnswer.bind(poll));

const displayArr = function (arr) {
    return poll.displayResults.bind({answers: arr, name: 'obj'}, 'string');
}

displayArr([5, 2, 4])();
displayArr([1, 5, 3, 9, 6, 1])();

// immediately invoked function expressions
(function () {
    console.log('this function is invoked only one');
})();
//variant with arrow function
(() => console.log('this function is invoked only one'))();

