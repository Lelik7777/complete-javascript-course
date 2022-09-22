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
};
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
const {menu=[],starterMenu=[]}=restaurant;
console.log(menu,starterMenu);

//mutating variables
let a=44;
let b=66;
let obj={a:2,b:3,u:5};
//{a,b,c}=obj;//Uncaught SyntaxError: Identifier 'a' has already been declared
//that why use () and mutate variables
({a,b}=obj);
console.log(a,b);

//nested objects
const {fri:{close,open}}=restaurant.openingHours;
console.log(close,open);
const {fri:{close:c,open:o}}=restaurant.openingHours;
console.log(c,o);

