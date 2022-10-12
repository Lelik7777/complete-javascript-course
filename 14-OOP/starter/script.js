'use strict';
let log=console.log;
log('hello');

function Person(name,age) {
    console.log('indicate to',this);
    this.name=name;
    this.age=age;
    //так делать нельзя,поскольку засоряется память
    this.getAge=function () {
        return this.age;
    }
}

console.log(new Person('bob',33));
const bob=new Person('bob',33);
console.log(bob);
console.log(bob.name)
console.log(bob.getAge())

class PersonClass {
    constructor(name,age) {
        console.log(this)
        this.name=name;
        this.age=age;
    }
}

console.log( new PersonClass('tom',44))