'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
        name: 'Classico Italiano',
        location: 'Via Angelo Tavanti 23, Firenze, Italy',
        categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
        starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
        mainMenu: ['Pizza', 'Pasta', 'Risotto'],
        order(startMenuIndex, mainMenuIndex) {
            return [this.starterMenu[startMenuIndex], this.mainMenu[mainMenuIndex]];
        },
        openingHours: {
            thu: {
                open: 12,
                close: 22,
            },
            fri: {
                open: 11,
                close: 23,
            },
            sat: {
                open: 0, // Open 24 hours
                close: 24,
            },
        },
        //осуществляем деструктуризацию объекта,который будет аргументом этого метода при его вызове; при этом мы сразу же можем задать значения по умолчанию
        orderDelivery({time, address, mainIndex = 1, starterIndex = 1, unknownValue = null}) {
            console.log(`${this.starterMenu[0]} ${starterIndex} and ${this.mainMenu[2]} ${mainIndex} will be delivered to ${address} at ${time}. also unknown property  equal  ${unknownValue}`);
        }
    }

;
//destructuring
const [first, second] = restaurant.categories;
console.log(first, second);

//get first and last element of array
let [beginner, , , last] = restaurant.categories;
console.log(beginner, last);

//switching variables
[beginner, last] = [last, beginner];
console.log(beginner, last);

//распаковываю на лету массив,который возвращает метод объекта
const [starter, main] = restaurant.order(2, 1);
console.log(starter, ' ', main);

//destructuring inside destructuring
const nestedArr = [3, 4, [5, 6]];

const [i, , [j, k]] = nestedArr;
console.log(i, j, k);
//здесь я не просто деструктурирую объект,но и переписываю значение name to bob
const nestedObj = [4, 5, {name: 'bob'}];
const [x, , {name: bob}] = nestedObj;
console.log(x, bob);
//default value -когда мы не знаем длину массива и чтобы не получить в значении undefined, то устанавливаем сразу же значения по умолчанию

const [d = 1, e = 1, l = 1] = [2, 4];
console.log(d, e, l);
// destructuring object
const {openingHours, name, categories} = restaurant;
console.log(`${JSON.stringify(openingHours, null, ' ')}
${name}
${categories}`);

//change name of object keys
const {
    name: restaurantName,
    openingHours: workTimes,
    categories: types,

} = restaurant;
console.log(restaurantName, workTimes, types);
//value by default
const {menu = [], starterMenu = []} = restaurant;
console.log(menu, starterMenu);

//mutating variables
let a = 44;
let b = 66;
let obj = {a: 2, b: 3, u: 5};
//{a,b,c}=obj;//Uncaught SyntaxError: Identifier 'a' has already been declared
//that why use () and mutate variables
({a, b} = obj);
console.log(a, b);

//nested objects
const {fri: {close, open}} = restaurant.openingHours;
console.log(close, open);
const {fri: {close: c, open: o}} = restaurant.openingHours;
console.log(c, o);

// destructuring object as argument in function

restaurant.orderDelivery({
    time: '20:00',
    address: 'Via del Sole,24',
    mainIndex: 3,
    starterIndex: 1,
});

//spread operator
const arr = [1, 3, 4];
const newArr = [5, 6, ...arr];
console.log(newArr);
const newArr1 = Object.assign([], arr);
let arr00 = [];
const newArr2 = Object.assign(arr00, arr);
console.log(newArr1);
console.log(newArr2);
const alex = 'Alex';
console.log([...alex]);
const arrayAl = [...alex];
console.log(arrayAl);

//using spread operator for function arguments
const sum = (a, b, c) => {
    return a + b + c;
}
//const arrayNum = [+prompt('first number'), +prompt('second number'), +prompt('third number')];
//console.log(sum(...arrayNum));
const arrNum = [4, 5, 6, 5, 6];
console.log(sum(...arrNum));

//spread for copy and add new properties for object from 2018
const bob1 = {name: 'bob'};
const copyBob = {...bob1};
console.log(bob1 === copyBob);
console.log(copyBob);
const copyBobNew = {...bob1, age: 33, job: 'developer'};
console.log(copyBobNew);

// starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//         mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//rest pattern
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

const {sat, ...workWeek} = restaurant.openingHours;
console.log(sat);
console.log(workWeek);

//rest for functions
const sumNums = (...nums) => {
    return nums.reduce((acc, cur) => acc + cur);
}
console.log(sumNums(3, 4, 5));
console.log(sumNums(4, 5, 6, 5, 6, 4));
const arrNums = [3, 4, 5, 6, 7];
console.log(sumNums(...arrNums));

// new using or ||  and && - it names  short circuiting
console.log(0 || 'bob');
console.log(0 && 'bob');

const obj22 = {
    name: 'tom', age: 44, getName() {
        console.log(this.name)
    }
};

obj22.getName && obj22.getName();

// logical assignment operators

const rest1 = {
    name: 'Capri',
    numGuests: 31,
};
const rest2 = {
    name: 'La Piazza',
    owner: 'Rossi',
    location: '',
}
const setNumGuests = (obj) => {
    //return obj.numGuests = obj.numGuests || 10;
    //concise method to write short circuiting
    return obj.numGuests ||= 10;
}
setNumGuests(rest1);
setNumGuests(rest2);
console.log(rest1);
console.log(rest2);
// concise method to write short circuiting using OR operator assignment
//rest2.location||='city center';
// this variant is more universal using nullish assignment
rest2.location ??= 'city center';
console.log(rest2);

//assignment AND operator
//rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner && '=<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest2);
console.log(rest1);

//challenge #1
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
//1
const [nameTeam1, nameTeam2] = [game.team1, game.team2];
console.log(nameTeam1, nameTeam2);
const [player1, player2] = game.players;
console.log('player1: ', player1);
console.log('player2: ', player2);
//2
const [gk1, ...fieldPlayers1] = player1;
console.log(gk1, fieldPlayers1);
const [gk2, ...fieldPlayer2] = player2;
console.log(gk2, fieldPlayer2);
//3
const allPlayers = [...player1, ...player2];
console.log(allPlayers);
//4
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//5
const {team1, team2, x: draw} = game.odds;
console.log(team1, team2, draw);
const {odds: {team1: team11, team2: team22, x: draw1}} = game;
console.log(team11, team22, draw1);
//6 
const printGoals = (...numNames) => {
    const numGoals = numNames.length;
    numNames.forEach(x => {
        console.log(`player ${x} scored ${numGoals} goals `);
    })
}
const getRandomNumPlayer = (arrPlayers, numPlayer) => {
    const arrRandomPlayers = [];
    for (let i = 0; i < numPlayer; i++) {
        const random = Math.floor(Math.random() * arrPlayers.length) + 1;
        arrRandomPlayers.push(arrPlayers[random] ??= arrPlayers[i]);
    }
    const set = new Set(arrRandomPlayers);
    console.log(set);
    return Array.from(set);
}
console.log(allPlayers)
console.log(getRandomNumPlayer(allPlayers, 10));
printGoals(...getRandomNumPlayer(allPlayers, 7));
//7
const winner1 = team1 < team2 && game.team1;
const winner2 = team2 < team1 && game.team2;
const winner = (team1 < team2 && game.team1) || (team2 < team1 && game.team2);
console.log(winner);
team1 < team2 && console.log('team1 is more likely to win');
team2 < team1 && console.log('team2 is more likely to win');


// for...of
for (const pl of player1) {
    if (pl.indexOf('G') != -1) continue;
    if (pl.indexOf('M') != -1) break;
    console.log(pl);
}
for (const el of player1.entries()) {
    console.log(`index ${el[0]}: value ${el[1]}`);
}
//using destructuring
for (const [i, el] of player1.entries()) {
    console.log(i + 1, el);
}

// enhanced object literals
const locationAlex = {
    city: 'Simferopol',
    street: 'Tambovska',
    house: 7,
}
const alex7 = {
    name: 'alex',
    age: 45,
    //ES6 enhanced object literals
    locationAlex,
    //ES6 enhance object key by calculating it
    [`count week training ${7 - 4}`]: 3,
    [`${2}-d son in family`]: true,
}
console.log(alex7);

//optional chaining ES2020
console.log(restaurant.age?.some.name);
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
    console.log(`restaurant on ${day} ${restaurant.openingHours[day] ? 'work' : 'close'} ${restaurant.openingHours[day]?.open != undefined ? 'at ' + restaurant.openingHours[day].open : ''}`)
}
//methods
const notMethod = 'method doesn`t exist';
console.log(restaurant.order?.(0, 1) ?? notMethod);
console.log(restaurant.getAge?.() ?? notMethod);

// arrays
const users = [
    {name: 'bob'},
    {name: 'tom'},
];
const notEx = 'not exist';
console.log(users[0]?.name ?? notEx);
console.log(users[4]?.name ?? notEx);


// looping objects by keys or values
let str = `we are opening on ${Object.keys(restaurant.openingHours).length} days:`;
console.log(str);
// for (const day of Object.keys(restaurant.openingHours)) {
//     str+=day+',';
// }
const arrKeys = Object.keys(restaurant.openingHours);
arrKeys.forEach((x, i) => {
    str += x + `${i + 1 === arrKeys.length ? '' : ','}`;
})
console.log(str);

//entries
const entries = Object.entries(restaurant.openingHours);
console.log(entries);
for (const [key, {open, close}] of entries) {
    console.log(`on ${key} we open at ${open} and close at ${close}`);
}
;

//challenge #2
//1

game.scored.forEach((x, i) => {
    console.log(`goal ${i + 1}: ${x}`);
});
//2
const odds = Object.values(game.odds);
const getAverage = (arr) => {
    return arr.reduce((acc, curr) => acc + curr) / arr.length;
}
console.log(getAverage(odds).toFixed(2));
//3
for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
    console.log(`odd of ${teamStr}:${odd}`);
    // console.log(`odd of ${game[key]?'victory':'draw:'}  ${game[key]?game[key]+':':''}${value}`)
}
//bonus
const scorers = {};

game.scored.forEach(x => {
    Object.create(scorers, {})
});


// collection  Set

const arrNumbers = [3, 4, 5, 4, 5, 2, 5, 3, 4, 2, 1];
console.log([...new Set(arrNumbers)]);
console.log(Array.from(new Set(arrNumbers)));


//Maps
const man = new Map();
const array = [4, 5, 6];
const $h1 = document.querySelector('h1');
man
    .set('name', 'bob')
    .set('age', 44)
    .set('location', {
        city: 'Moscow', street: 'Red Square', dom: {
            number: 34,
        }
    })
    .set('friends', ['ann', 'nick', 'sam'])
    .set(true, 'work in the office')
    .set(false, 'at home')
    .set('work', 8)
    .set('home', 18)
    // .set([4,5,6],'test')
    //better do so
    .set(array, 'test')
    // .set(document.querySelector('h1'),'Heading')
    //better do so
    .set($h1, 'Header')
console.log(man);
const randomTime = () => {
    return Math.floor(Math.random() * 23);
}
const time = randomTime();
console.log(man.get(time > man.get('work') && time < man.get('home')));
console.log(man.get(array))
console.log(man.get($h1))

//create quiz app
const arrayQuestions = [];

function getArray(lengthArr) {
    const arr = [];
    for (let i = 1; i <= lengthArr; i++) {
        arr.push('question' + i);
    }
    return arr;
}

console.log(getArray(10));
const question1 = 'question1';
const correct = 'correct';
const notCorrect = 'not correct';
const quiz = new Map([
    [question1, 'what is the best programming language?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'Js'],
    [correct, 3],
    [true, correct],
    [false, notCorrect],
]);
console.log(quiz.get(question1));
for (const [key, value] of quiz) {
    typeof key === 'number' && console.log(`${key}.${value}`);
}
//let answer1 = +prompt('choose your answer as number');
let answer1 = 3;
if (answer1 < 0 || answer1 > 4) {
    console.log('you must enter number from 1 to 3');
    answer1 = +prompt('choose your answer as number');
}
if (answer1 === quiz.get(correct)) console.log('you guessed');
else console.log('answer is not correct');

console.log([...quiz.keys()])

//challenge #3;
const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

//1

const events = [...new Set(gameEvents.values())]
console.log(events);
//2
gameEvents.delete(64);
console.log(gameEvents.keys());
//3
console.log(`an event happened,on  `);

//4
function getMessage(bool) {
    return `${bool ? 'first' : 'second'} half`;
    return bool ? '[first half]' : '[second half]';
}

for (const [min, event] of gameEvents.entries()) {
    const message = `${getMessage(min <= 45)} ${min}: ${event}`;
    if (min <= 45) console.log(message);
    if (min > 45 && min <= 90) console.log(message);
}


//STRINGS

const string = 'hello world and my country';
const world = string.slice(string.indexOf('wor'), string.indexOf('and'));
console.log(world.trim().length);
const str00 = 'For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer.\n';
console.log(str00)
const figure = str00.slice(str00.indexOf('figure'), str00.indexOf('on it spring'));
console.log(figure.trim())
console.log(typeof new String('helle'));
console.log('hello'.indexOf('h'));


let passenger = 'jOnAs';
passenger = passenger.toLowerCase();
passenger = passenger[0].toUpperCase() + passenger.slice(1);
console.log(passenger);
const priceGB = '339,33€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);
// string.includes('substring'); => true false
// string.startWith('substring') => true false
//string.endsWith('substring') => true false

//string 3
// method .split();
//using destructuring and split
const [fistName, lastName] = 'Alex Kvachkov'.split(' ');
console.log(fistName, lastName);
//method .join()
console.log(['Mr.', fistName, lastName.toUpperCase()].join(' '));

function capitalize(string) {
    //using method replace() is more fine
    return string.split(' ').map(x => x.replace(x[0], x[0].toUpperCase())).join(' ');
    //using method slice()
    return string.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
}

console.log(capitalize('jessica ann smith davis'));

//padding a string
let stringSome = '44';
const newSrt = stringSome.padStart(4, '21');
console.log(newSrt);
console.log(stringSome);
//app to mask first digits of number
const maskCreditCard = (num) => {
    const str = num.toString();
    const length = str.length;
    return str.slice(length - 4).padStart(length, '*');
}
console.log(maskCreditCard(33434332311));
//also exist padEnd
console.log(stringSome.padEnd(stringSome.length + 2, '0'));

//method repeat()
const someText = 'hello,world';
console.log(someText.repeat(4));

const planesInLine = (num) => {
    return `There are ${num}  planes in line ${'✈'.repeat(num)}`;
}
console.log(planesInLine(6));

