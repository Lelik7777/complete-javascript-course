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

//ES6 CLASSES
//expression
// const PersonCl = class {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// // save in prototype
//     getAge() {
//         console.log(`${this.name} is ${this.age}`);
//     }
// }
//the same but declaration
class PersonCl {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

// save in prototype
    getAge() {
        console.log(`${this.name} is ${this.age} years ago`);
    }
}

const jessica = new PersonCl('Jessica', 19);
jessica.getAge();
//we also can add method by using prototype property
PersonCl.prototype.getName = function () {
    console.log(this.name);
}
console.log(jessica);
jessica.getName();

//1. classes are NOT hoisted
//2. Classes are first-class citizens - we can pass them into functions and return from ones
//3. classes are executed in strict mode always

//SETTERS AND GETTERS - we call these special properties assessor properties
console.log([3, 4].slice(-1).pop())
//remember that they are properties!!
const account = {
    owner: 'Bob',
    movements: [300, 200, 100],
    //use get keyword
    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov);
    }
}
//using as getting
console.log(account.latest);
//using as setting
account.latest = 500;
console.log(account.movements);
//and again as getting
console.log(account.latest);

//если мы используем set для переопределения уже существующего свойства,то нужно создавать новое свойство с подобным именем через нижнее подчеркивание
// к примеру, используем set для проверки правильности введенного имени
class PersonNew {
    constructor(fullName, age) {
        this.fullName = fullName;
        this.age = age;
    }

    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else console.log('not correct name');
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('hey! i am static method in class');
    }
}

const anna = new PersonNew('Ann', 23);
const annaBiroff = new PersonNew('Anna Biroff', 33);
console.log(annaBiroff.fullName);

//STATIC METHOD - статический метод прикреплен к конструктору и только к нему и не находится в prototype, поэтому не наследуюется экземплярами
//создание статического метода для ф-ции конструктора
Person.hey = function () {
    console.log('hey! i am a static method');
}
Person.hey();
//создание станического метода в классе
PersonNew.hey();

//challenge #2
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going  at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going  at ${this.speed} km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
console.log(ford.speedUS);


