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
        return this;
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going  at ${this.speed} km/h`);
        return this;
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

//OBJECT.CREATE()
const objProto = {
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else console.log('not correct full name');
    },

    get fullName() {
        return this._fullName;
    },
    //этот метод по сути имитирует конструктор класса и инициализирует начальные значения
    init(fullName, age) {
        this.fullName = fullName;
        this.age = age;
    }
}
const nick = Object.create(objProto);
console.log(nick);
nick.init('Nick Walevski', 33);
console.log(nick);
console.log(nick.fullName);

//1
//INHERITANCE BETWEEN 'CLASSES' using function constructors
//parent function constructor
function Human(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Human.prototype.calcAge = function () {
    return new Date().getFullYear() - this.birthYear;
}
const bobby = new Human('Bobby', 1999);
console.log(bobby);
console.log(bobby.calcAge());

//child function constructor
function Student(firstName, birthYear, course) {
    Human.call(this, firstName, birthYear);
    this.course = course;
}

//!!!!!!!!!!!!
//здесь мы осуществляем привязку Student prototype to Human prototype making prototype chain
Student.prototype = Object.create(Human.prototype);

//здесь мы возращаем названию конструктора Student его прежнее имя Student вместо Human
Student.prototype.constructor = Student;

const mike = new Student('Mike', 2000, 5);
console.log(mike);

//этого метода нет in Student prototype,поэтому движок ищет его по цепочке прототипов и находит в Human prototype
console.log(mike.calcAge());
//add method in Student prototype
Student.prototype.introduce = function () {
    console.log(`I am ${this.firstName} and study ${this.course} `);
}
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);//true
console.log(mike instanceof Human);//true
console.log(mike);

// challenge #3
function CarNew(make, speed) {
    this.make = make;
    this.speed = speed;
}

CarNew.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going  at ${this.speed} km/h`);
}
CarNew.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going  at ${this.speed} km/h`);
}

function EV(make, speed, charge) {
    //здесь мы по сути используем CarNew в качестве конструктора
    CarNew.call(this, make, speed);
    this.charge = charge;
}

//включаем CarNew prototype in prototype chain of Ev prototype
//link EV prototype to inherit CarNew prototype
EV.prototype = Object.create(CarNew.prototype);

//возвращаем название конструктору Ev
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}

//здесь мы реализуем паттерн полиморфизма, перезаписывая родительский метод!!!!
EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed}, with a charge of ${this.charge}%`)
}

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(35);
console.log('tesla', tesla);
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();

//2
//Inheritance between classes ES6

// class PersonNew {
//     constructor(fullName, age) {
//         this.fullName = fullName;
//         this.age = age;
//     }
//
//     set fullName(name) {
//         if (name.includes(' ')) this._fullName = name;
//         else console.log('not correct name');
//     }
//
//     get fullName() {
//         return this._fullName;
//     }
//
//     static hey() {
//         console.log('hey! i am static method in class');
//     }
// }

// inheritance from class PersonNew
class StudentNew extends PersonNew {
    constructor(fullName, age, course) {
        //это по сути вызов родительского класса,после чего происходит привязка this
        super(fullName, age);
        this.course = course;
    }

    introduce() {
        console.log(`I am ${this.fullName} and study ${this.course} `);

    }
}

const
    masha = new StudentNew('Masha Beregnaya', 21, 'computer science');
console
    .log(masha)
masha.introduce();

//3
//Inheritance between classes using Object.create()
//first level
const personProto = {
    init(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    },
    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }
}
//связали one prototype with another - personProto -parent and student - child
//second level
const studentProto = Object.create(personProto);
console.log('studentProto', studentProto);

//переопределяю родительский метод!!!
studentProto.init = function (fullName, bithYear, course) {
    personProto.init.call(this, fullName, bithYear);
    this.course = course;
}
studentProto.introduce = function () {
    console.log(`I am ${this.fullName} and study ${this.course} `);
}
//studentProto.init('Bob Smith', 2000, 'frontend');
//studentProto.introduce();
console.log('studentProto', studentProto);

//third level
const bobStudent = Object.create(studentProto);

console.log('bobStudent', bobStudent);
bobStudent.init('bob', 1998, 'course by js');
console.log('bobStudent', bobStudent);
bobStudent.introduce();
console.log(bobStudent.getAge());

// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)
//example with class
class Account {
    //в виде полей в классе указываются те свойства,которые не задаются через конструктор и одинаковые для всех инстансов
    //public fields
    locale = navigator.language;
    //private fields
    #pin;
    #owner;
    #movements = [];
    static ownName = 'Account';

    constructor(owner, currency, pin) {
        this.#owner = owner;
        this.currency = currency;
        //private properties
        this.#pin = pin;
    }

//public interface
    deposit(val) {
        this.#movements.push(val);

        //благодаря этому мы можем использовать вызов этого метода в цепачке!!!
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`your loan approve`);
            return this;
        }
    }

    get owner() {
        return this.#owner ?? 'not owner';
    }

    set owner(name) {
        this.#owner = name;
    }

    getMovements() {
        return this.#movements;
    }

//private method
    #approveLoan(val) {
        return true;
    }

//static
    static helper() {
        console.log('helper');
    }
}

//create new instance
const acc1 = new Account('Jonas', 'EUR', 1111);

//using setter and getter
acc1.owner = 'Nick';
console.log(acc1.owner)

acc1.deposit(100);
acc1.withdraw(50);
acc1.requestLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());

// call static method
Account.helper();//helper
// get static property
console.log(Account.ownName);

//методы объекта acc1 можно вызывать цепочкой
acc1.deposit(300).deposit(400).requestLoan(1000).withdraw(200).deposit(100).withdraw(300);
console.log(acc1.getMovements());


//challenge #4

// class CarCl {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }
//
//     accelerate() {
//         this.speed += 10;
//         console.log(`${this.make} is going  at ${this.speed} km/h`);
//     }
//
//     brake() {
//         this.speed -= 5;
//         console.log(`${this.make} is going  at ${this.speed} km/h`);
//     }
//
//     get speedUS() {
//         return this.speed / 1.6;
//     }
//
//     set speedUS(speed) {
//         this.speed = speed * 1.6;
//     }
//
// }

//1
class EVCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} going at ${this.speed}, with a charge of ${this.#charge}%`);
        return this;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.accelerate().chargeBattery(90).brake().brake().accelerate();
console.log(rivian.speedUS);