'use strict';
let log = console.log;
log('hello');

function Person(name, age) {
    console.log('indicate to', this);
    this.name = name;
    this.age = age;
    //так делать нельзя,поскольку засоряется память многочисленными копиями этой ф-ции
    // this.getAge=function () {
    //     return this.age;
    // }
}

//методы добавляются через свойство prototype
Person.prototype.getAgeProto = function () {
    return this.age;
}
console.log(new Person('bob', 33));

const bob = new Person('bob', 33);

console.log('bob', bob);
console.log(bob.name);
console.log(new Person('name', 33))
console.log(bob.getAgeProto());

const tom = new Person('tom', 55);

console.log('tom', tom);
const user = {name: 'user', age: 33};
const arr = [3, 4, 5];

console.log(Person.prototype.isPrototypeOf(bob));//true
console.log(Person.prototype.isPrototypeOf(Person));//false
console.log(Person.prototype.isPrototypeOf(user));
console.log(Array.prototype.isPrototypeOf(user));
console.log(Array.prototype.isPrototypeOf(arr));
//так лучше не делать!!!! поскольку этот метод появляется в общем prototype всех объектов созданных с помощью new Person()
tom.__proto__.hello = function () {
    console.log(`hello,${this.name}`);
}
console.log('tom', tom);
console.log(tom.hello())
console.log(bob.hello());
console.log(tom.__proto__);//{getAgeProto: ƒ, hello: ƒ, constructor: ƒ}
console.log(tom.__proto__.__proto__);//Object prototype
console.log(tom.__proto__.__proto__.__proto__);//null

console.dir(Person.prototype.constructor);//
//look the same
// console.log(Person.prototype);
//
// class PersonClass {
//     constructor(name, age) {
//         console.log(this)
//         this.name = name;
//         this.age = age;
//     }
// }
//
// console.log(Person.prototype.constructor)
// console.log(new PersonClass('tom', 44));
// console.log(Object.prototype);
//
// console.log(Object.prototype.myMethod = function () {
//     console.log('my own method');
// });
// bob.__proto__.__proto__.newMethodForObject = function () {
//     console.log('mad method');
// }


// array prototype
const array = [3, 4, 5, 6, 4];
console.log(array.__proto__);
console.log(Array.prototype);
console.log(array.__proto__ === Array.prototype);//true

//extend functionality Array but better don`t do that!!!!
Array.prototype.unique = function () {
    return [...new Set(this)];
}
console.log(array.unique())
//prototype chain html elements
const h1 = document.querySelector('h1');
console.dir(h1);

//challenge #1
function Car(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going  at ${this.speed} km/h`);
}
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going  at ${this.speed} km/h`);
}
console.log('Car', Car.prototype);
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.brake();
bmw.brake();
bmw.brake();
bmw.accelerate();
mercedes.brake();
mercedes.accelerate();
console.log(bmw);
console.log(mercedes);